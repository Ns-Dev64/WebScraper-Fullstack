import React from 'react';
import './KeyComponents.css'; // Import the CSS file

const KeyHighlights = ({ highlights, productDetails }) => {
  return (
    <div className="key-highlights-container">
      <h2 className="key-highlights-heading">Key Highlights</h2>
      <div className="key-highlights-grid">
        <div className="key-highlights-column">
          <div className="key-highlights-item">
            <strong>Fit</strong>
            <p className="key-highlights-value">{highlights.fit}</p>
          </div>
          <div className="key-highlights-item">
            <strong>Neck</strong>
            <p className="key-highlights-value">{highlights.neck}</p>
          </div>
          <div className="key-highlights-item">
            <strong>Pattern</strong>
            <p className="key-highlights-value">{highlights.pattern}</p>
          </div>
        </div>
        <div className="key-highlights-column">
          <div className="key-highlights-item">
            <strong>Fabric</strong>
            <p className="key-highlights-value">{highlights.fabric}</p>
          </div>
          <div className="key-highlights-item">
            <strong>Sleeve</strong>
            <p className="key-highlights-value">{highlights.sleeve}</p>
          </div>
          <div className="key-highlights-item">
            <strong>Length</strong>
            <p className="key-highlights-value">{highlights.length}</p>
          </div>
        </div>
      </div>
      
      {/* Product Description Section */}
      {productDetails===null?(
        <></>
      ):(
        <div className="product-description-container">
        <h2 className="product-description-heading">Product Description</h2>
        <p><strong>Material:</strong> {productDetails.material}</p>
        <p><strong>Product Description:</strong> {productDetails.description}</p>
        <p><strong>Features:</strong></p>
        <ul>
          {productDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p><strong>Origin:</strong> {productDetails.origin}</p>
        <p><strong>Wash Care:</strong> {productDetails.washCare}</p>
        <p><strong>Please Note:</strong> {productDetails.note}</p>
      </div>
      )}
    </div>
  );
};

export default KeyHighlights;
