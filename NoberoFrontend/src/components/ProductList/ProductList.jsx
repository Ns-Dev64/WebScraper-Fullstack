import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterSidebar from '../FilterSideBar/FilterSideBar'; // Import your FilterSidebar component

const ProductList = () => {
  // State to hold the list of all products
  const [products, setProducts] = useState([]);

  // State to hold the filtered list of products
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State to hold the current active filters
  const [filters, setFilter] = useState(null);

  // Fetch the list of products from the API when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mens/products/')
      .then(response => setProducts(response.data)) // Set the products data in state
      .catch(error => console.error('Error fetching products:', error)); // Log any errors
  }, []); // Empty dependency array means this effect runs only once

  // Function to handle filter changes
  const handleFilters = (filter) => {
    if (filter === null) {
      // If the filter is null, reset the filters
      setFilter(filter);
    } else {
      // Otherwise, apply the filter to the product list
      setFilter(filter);
      let filteredproducts = [];

      // Iterate over each product to check if it matches the filter criteria
      products.map((product) => {
        const productString = JSON.stringify(product); // Convert product object to string for easier searching

        // Handle price filtering separately
        if (filter[0] === 'price') {
          // Extract the price and compare it to the filter's price range
          if (
            parseFloat(product.price[0].split('₹')[1].replace(',', '')) > 
            parseFloat(filter[1].replace(',', ' ').split(' ')[0]) &&
            parseFloat(product.price[0].split('₹')[1].replace(',', '')) <
            parseFloat(filter[1].replace(',', ' ').split(' ')[1])
          ) {
            filteredproducts.push(product); // Add the product to the filtered list if it matches the price range
          }
        } 
        // Handle other filters (e.g., color, size, etc.)
        else if (productString.includes(filter[1])) {
          filteredproducts.push(product); // Add the product to the filtered list if it matches the filter criteria
        }
      });

      console.log(filteredproducts); // Log the filtered products for debugging
      setFilteredProducts(filteredproducts); // Set the filtered products in state
    }
  }

  return (
    <>
      {/* Check if filters are applied */}
      {filters === null ? (
        // If no filters are applied, show the full product list
        <div className="product-list-container">
          <FilterSidebar onFilterChange={handleFilters}></FilterSidebar>
          <div className="product-list">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        // If filters are applied, show the filtered product list
        <div className="product-list-container">
          <FilterSidebar onFilterChange={handleFilters}></FilterSidebar>
          <div className="product-list">
            {filteredProducts.length !== 0 ? (
              // If there are filtered products, display them
              <>
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </>
            ) : (
              // If no products match the filter criteria, show an out-of-stock message
              <>
                <p className="out-of-stock">Out of stock!!!</p>
                <p className='out-of-stock' style={{color:'black'}}>
                  We are really sorry for the inconvenience 
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
