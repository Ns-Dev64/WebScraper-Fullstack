import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterSidebar from '../FilterSideBar/FilterSideBar';// Import your FilterSidebar component

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mens/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list-container">
     <FilterSidebar></FilterSidebar>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
