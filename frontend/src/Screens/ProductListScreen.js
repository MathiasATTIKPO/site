import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {Link, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { createProduct, listProducts } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constant/productConstante';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();
  /* */
  const productList = useSelector(state => state.productList);
  const{ loading, error , products , page , pages } = productList;
  /* */
  const productCreate = useSelector(state => state.productCreate);
  const{ loading :loadingCreate , error: errorCreate , success: successCreate , product: createdProduct } = productCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/productAdmin/${createdProduct._id}/edit`);
    }
    dispatch(listProducts(pageNumber));
  } , [dispatch , pageNumber ,  successCreate , createdProduct , props.history]);
  
  const createHandler =()=> {
    dispatch(createProduct());
  };
  const deleteHandler =()=> {};
  return (
    <div>
      <div className="row">
        <h1> Logement</h1>
        <button type="button" className="primary" onClick={createHandler}>Ajouter logement</button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                <th> Nom</th>
                <th>Prix</th>
                <th>Catégories</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
                {products.map((product) =>(
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.prix}</td>
                    <td>{product.category}</td>
                    <td>
                      <button type ="button" className="small" 
                        onClick={() => 
                        props.history.push(
                          `/productAdmin/${product._id}/edit`)
                          }>Modifier
                      </button> 
                      <button type="button" className="primary" onClick={() => deleteHandler}>Supprimer</button>
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
