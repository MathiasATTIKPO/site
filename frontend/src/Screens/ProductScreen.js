import React from 'react';
import Info from '../composant/Info';
import data from '../data';
import {Link }from 'react-router-dom';
export default function ProductScreen(props){
    const product = data.products.find(x => x._id === props.match.params.id);
    if (!product){
        return <div>
            L'article n'a pas été trouver 
        </div>;
    }
    return(
        <div>
           <Link to="/">Back </Link>
           <div className="row top">
                <div className="col-2" >
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1" >
                    <ul>
                        <li> 
                          
                            <h1> {product.name} </h1>  
                        
                        </li>
                        <li>
                            <Info info= {product.info} 
                            numReviews = {product.numReviews} 
                            ></Info>
                        </li>
                        <li>
                            Prix:
                            XOF {product.prix}
                        </li>
                        <li>
                            Description:
                            <p>{product.description} </p>
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
                                        XOF{product.prix}
                                    </div>   
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> Status :</div>
                                    <div>
                                        {product.countInStock>0? (<span className="success"> Libre </span>
                                        ):(
                                            <span className="danger"> Indisponible </span>)
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block"> Ajouter a la carte</button>
                            </li>
                        </ul>
                    </div>
                </div>
           </div>
        </div>
    );
}