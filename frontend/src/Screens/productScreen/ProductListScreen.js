import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../constant/productConstante';
import { createProduct, deleteProduct, listProducts } from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';


export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  /* */
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  /* */
  const productList = useSelector(state => state.productList);
  const{ loading, error , products , page , pages } = productList;
  /* */
  const productCreate = useSelector(state => state.productCreate);
  const{ loading :loadingCreate , error: errorCreate , success: successCreate , product: createdProduct } = productCreate;
  /* */
  const productDelete = useSelector(state => state.productDelete);
  const { loading :loadingDelete , error: errorDelete , success: successDelete}= productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/productAdmin/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber})
    );
  } , [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);
  
  const createHandler =()=> {
    dispatch(createProduct());
  };
  const deleteHandler =(product)=> {
    if (window.confirm('Voulez vous vraiment supprimer?')) {
      dispatch(deleteProduct(product._id));
    }
   
  };
  return (
    <div>
      <div className="row">
        <h1> Logement</h1>
        <button type="button" className="primary" onClick={createHandler}>Ajouter logement</button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th> ID</th>
                <th>Agences</th>
                <th> Nom</th>
                <th>Prix</th>
                <th>Catégories</th>
                <th>images</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
                {products.map((product) =>(
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.seller.seller.name}</td>
                    <td>{product.name}</td>
                    <td>{product.prix}</td>
                    <td>{product.category}</td>
                    <td><img 
                                src={product.image}
                                alt={product.name}
                                className="small"
                            ></img></td>
                    <td>
                      <button type ="button" className="small" 
                        onClick={() => 
                        props.history.push(
                          `/productAdmin/${product._id}/edit`)
                          }>Modifier
                      </button> 
                      <button type="button" className="primary" onClick={() => deleteHandler(product)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
