import React from 'react'

export default function Image(props) {
    const { product } = props;
    return (
      <div key={product._id} className="offre">
          <img className="medium" src={product.image} alt={product.name} />
          <img className="medium" src={product.image} alt={product.name} />
          <img className="medium" src={product.image} alt={product.name} />
          <img className="medium" src={product.image} alt={product.name} />
      </div>
  )
}
