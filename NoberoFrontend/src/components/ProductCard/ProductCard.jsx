import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Clean the image URL
    product.Image = product.Image.replace('[', '').replace('"', '').replace("'", '');
  
    return (
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-card">
          <img src={"https:" + product.Image} alt={product.Category} className="product-image" />
          <h2>{product.Category}</h2>
          <p>{product.price}</p>
          <p><span className="strikethrough">{product.Discount[1]}</span></p>
          <p style={{ color: 'green', fontWeight: 'bolder' }}>{product.Discount[0]}</p>
        </div>
      </Link>
    );
};

export default ProductCard;
