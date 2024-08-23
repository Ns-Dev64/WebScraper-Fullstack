import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import SizeSelector from '../SizeSelector/SizeSelector';
import AddToCartButton from '../AddtoCart/AddToCartButton';
import ColorSelector from '../ColorSelector/ColorSelector';
import KeyHighlights from '../KeyComponents/KeyComponents';

const ProductDetails = () => {
  // Extract the product ID from the URL using useParams hook
  const { id } = useParams();

  // State to hold the product data fetched from the API
  const [product, setProduct] = useState(null);
  
  // State to keep track of the current image index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch product data from the API when the component mounts or the ID changes
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/mens/products/${id}/`)
      .then(response => setProduct(response.data))  // Set the product data in state
      .catch(error => console.error('Error fetching product:', error));  // Log any errors
  }, [id]);  // The effect runs whenever the 'id' changes

  // Show a loading indicator while the product data is being fetched
  if (!product) return <div>Loading...</div>;

  // Clean up the image URLs and split them into an array
  product.Image = product.Image.replaceAll("'", "").replaceAll("]", "").replaceAll("[", "");
  const images = product.Image.split(',');

  // Handle previous button click in the image carousel
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Handle next button click in the image carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Calculate the MRP (Maximum Retail Price) based on the product's price and discount
  const price = parseFloat(product.price.join().replace('₹', ''));
  const off = parseFloat(product.Discount[1].replace('₹', '').replace('OFF', ''));
  const mrp = price + off;

  // Extract color and size information from the available SKUs
  const [colorInfo, sizeInfo] = product.availble_skus.split('Size');
  let color = colorInfo.replace('Color', '').trim().split(" ");
  console.log(color.length);

  // Split sizes based on multiple spaces or new lines and filter out any empty strings
  const sizes = sizeInfo.split(/\s+/).filter(size => size);

  // Prepare the product specifications to be passed to the KeyHighlights component
  const productSpecs = {
    "fit": product.product_key_specifications[0],
    "fabric": product.product_key_specifications[1],
    "neck": product.product_key_specifications[2],
    "pattern": product.product_key_specifications[4],
    "sleeve": product.product_key_specifications[3],
    "length": product.product_key_specifications[5]
  };

  // Prepare the product description to be passed to the KeyHighlights component
  let productDes;
  if (product.product_description.length === 0) {
    productDes = null;  // If no description is available, set it to null
  } else {
    productDes = {
      "material": product.product_description[0],
      "description": product.product_description[1] + product.product_description[2],
      "features": [
        product.product_description[3].replace('• ', ''),
        product.product_description[4].replace('• ', ''),
        product.product_description[5].replace('• ', ''),
        product.product_description[6].replace('• ', ''),
        product.product_description[7].replace('• ', ''),
        product.product_description[8].replace('• ', ''),
      ],
      "origin": product.product_description[9],
      "washCare": product.product_description[10],
      "note": product.product_description[11],
    };
  }

  return (
    <div className="product-details">
      {/* Image carousel for product images */}
      <div className="carousel">
        <button className="prev-button" onClick={handlePrev}>Previous</button>
        <img 
          src={"https:" + images[currentIndex].trim()} 
          alt={product.Category} 
          className="product-image" 
        />
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>

      {/* Product information section */}
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className="price-discount">
          <p className="price">{product.price}</p>
          <p className='off'>{product.Discount[0]}</p>
        </div>
        <p className='discount'>₹{mrp}</p>
        <p style={{ fontWeight: 'bolder' }}>
          <img 
            src="//nobero.com/cdn/shop/t/199/assets/icon-cart-pdp.svg?v=20438097039410931521688658287" 
            loading="lazy" 
            width="16" 
            height="16" 
            alt="icon_cart_pdp"
          />
          {product.Last_7_days}
        </p>
        <hr />
        
        {/* Color selection component */}
        <ColorSelector colors={color}></ColorSelector>
        <hr />
        
        <p style={{ 'fontSize': '1.5rem' }}>Select Size</p>
        <hr />
        
        {/* Size selection component */}
        <SizeSelector sizes={sizes}></SizeSelector>
        <hr />
        
        {/* Add to Cart button */}
        <AddToCartButton></AddToCartButton>
        <br />
        
        {/* Trust banner image */}
        <img 
          src='https://nobero.com/cdn/shop/files/trust_banner_2.svg?v=1680263466' 
          alt='notifyPng' 
          style={{ marginLeft: '21px' }} 
        />
        <br />
        
        {/* Key highlights component to show product specifications and description */}
        <KeyHighlights highlights={productSpecs} productDetails={productDes}></KeyHighlights>
      </div>
    </div>
  );
};

export default ProductDetails;
