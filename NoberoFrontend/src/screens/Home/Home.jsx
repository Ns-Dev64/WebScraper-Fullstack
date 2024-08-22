import React from 'react';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
