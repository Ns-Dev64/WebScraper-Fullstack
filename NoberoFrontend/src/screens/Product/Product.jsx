import React from 'react';
import Header from '../../components/Header/Header';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
const Product = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <ProductDetails />
      </div>
    </div>
  );
};

export default Product;
