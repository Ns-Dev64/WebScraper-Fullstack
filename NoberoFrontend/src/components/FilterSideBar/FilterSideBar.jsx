import React from 'react';
import './FilterSidebar.css'; // Assuming you'll extract related styles into this file

const FilterSidebar = () => {
  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>
      <hr />
      <div className="filter-section">
        <h3>Price</h3>
        <div className="filter-option">
          <input type="checkbox" id="price-1" />
          <label htmlFor="price-1">Less than ₹500</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="price-2"  />
          <label htmlFor="price-2">₹500 - ₹1000</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="price-3" />
          <label htmlFor="price-3">₹1000 - ₹1500</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="price-4" />
          <label htmlFor="price-4">₹1500 - ₹2000</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="price-5" />
          <label htmlFor="price-5">More than ₹2000</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Color</h3>
        <div className="filter-option">
          <input type="checkbox" id="color-aloe-green" />
          <label htmlFor="color-aloe-green">Aloe Green</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="color-apricot-crush" />
          <label htmlFor="color-apricot-crush">Apricot Crush</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="color-authentic" />
          <label htmlFor="color-authentic">Authentic/Never Say No</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="color-be-free" />
          <label htmlFor="color-be-free">Be Free/Believe</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="color-black" />
          <label htmlFor="color-black">Black</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Size</h3>
        <div className="filter-option">
          <input type="checkbox" id="size-s" />
          <label htmlFor="size-s">S</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="size-m" />
          <label htmlFor="size-m">M</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="size-l" />
          <label htmlFor="size-l">L</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="size-xl" />
          <label htmlFor="size-xl">XL</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="size-xxl" />
          <label htmlFor="size-xxl">XXL</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="size-xxxl" />
          <label htmlFor="size-xxxl">XXXL</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Neck</h3>
        <div className="filter-option">
          <input type="checkbox" id="neck-round" />
          <label htmlFor="neck-round">Round Neck</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Sleeve Length</h3>
        <div className="filter-option">
          <input type="checkbox" id="sleeve-short" />
          <label htmlFor="sleeve-short">Short Sleeves</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Fit</h3>
        <div className="filter-option">
          <input type="checkbox" id="fit-relaxed" />
          <label htmlFor="fit-relaxed">Relaxed Fit</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="fit-oversized" />
          <label htmlFor="fit-oversized">Oversized Fit</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Fabric</h3>
        <div className="filter-option">
          <input type="checkbox" id="fabric-cotton" />
          <label htmlFor="fabric-cotton">Cotton</label>
        </div>
      </div>
      <hr />
      <div className="filter-section">
        <h3>Pattern</h3>
        <div className="filter-option">
          <input type="checkbox" id="pattern-printed" />
          <label htmlFor="pattern-printed">Printed</label>
        </div>
        <div className="filter-option">
          <input type="checkbox" id="pattern-solid" />
          <label htmlFor="pattern-solid">Solid</label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
