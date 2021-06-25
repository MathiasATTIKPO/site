 import React from 'react'
import Info from './Info';

 export default function Product (props){
     const {product}=props;
     return ( 
        <div key={product._id} className="offre">
        <a className="normal" href ={`/product/${product._id}`} >
            <img src={product.image} alt= {product.name} ></img>
        </a>
        <div className="offre-body"> 
            <a href ={`/product/${product._id}`} >
                <h2>{product.name} </h2>
            </a>
        </div>
            <Info 
                info ={product.info}
                numReviews={product.numReviews}
            ></Info>
        <div className="prix">
           {product.prix}
        </div>
    </div>
     )
 }