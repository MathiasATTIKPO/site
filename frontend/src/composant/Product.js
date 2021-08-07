import React from 'react';
import { Link } from 'react-router-dom';
import Info from './Info';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Info
          Info={product.info}
          numReviews={product.numReviews}
        ></Info>
        <div className="prix">${product.price}</div>
      </div>
    </div>
  );
}
