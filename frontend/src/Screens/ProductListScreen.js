import React from 'react'
import {useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {Link} from 'react-router-dom';

export default function ProductListScreen(props) {

  const productList = useSelector(state => state.productList);
  const{ loading, error , products , page , pages } = productList;
  const createHandler =()=> {};
  const deleteHandler =()=> {};
  return (
    <div>
      <div className="row">
        <h1> Logement</h1>
        <button type="button" className="primary" onClick={createHandler}>Ajouter logement</button>
      </div>
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
              <tbody>
                {products.map((product) =>(
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                      <button type ="button" className="small" 
                        onClick={() => 
                        props.history.push(
                          `/product/${product.id}/edit`)
                          }>Edit
                      </button> 
                      <button type="button" className="primary" onClick={() => deleteHandler}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </thead>
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
