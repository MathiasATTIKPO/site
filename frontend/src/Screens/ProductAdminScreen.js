import React, { useEffect } from 'react';
import Rating from '../components/Rating';
import { useSelector , useDispatch } from 'react-redux';
import {Link }from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';


export default function ProductScreen(props){
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect (() =>{
        dispatch(detailsProduct(productId));
    } ,[dispatch, productId]);
    
    return(
        
    <div>
        {loading ? (
        <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div>
            <Link to="/productList"> RETOUR  </Link>
            <div className="row top">
                <div className="col-2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="large"
                    ></img>
                </div>
                <div className="col-1" >
                    <ul>
                        <li> 
                           
                            <h1> {product.name} </h1>  
                         
                        </li>
                        <li>
                            <Rating 
                                rating= {product.rating} 
                                numReviews = {product.numReviews} 
                            ></Rating>
                        </li>
                        <li>
                            Prix:    
                                {product.prix}  XOF
                        </li>
                        <li>
                            Description:
                            <p>{product.description} </p>
                        </li>
                        <li>
                            <img 
                                src={product.image}
                                alt={product.name}
                                className="small"
                            ></img>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="offre offre-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>
                                        Prix:
                                    </div>
                                    <div className="prix"> 
                                         XOF  {product.prix}
                                    </div>
                                        
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> Status :</div>
                                    <div>
                                        {product.countInStock ==="libre"? (<span className="success"> Libre </span>
                                        ):(
                                            <span className="danger"> Indisponible </span>)
                                        }
                                    </div>
                                </div>
                            </li>                          
                    </ul>
                    </div>
                </div>
            </div>
        </div>
         )}
    </div>
       
    );
}