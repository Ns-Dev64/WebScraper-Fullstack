import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
 
  const initialFilters = {
    price: [],
    color: [],
    size: [],
    neck: [],
    sleeve: [],
    fit: [],
    fabric: [],
    pattern: [],
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        updatedFilters[category].push(value);
      }
      if(category==='price'){
        const priceval=value.match(/\d+/g).join()
      onFilterChange([`${category}`,priceval])
      }
      else{
        onFilterChange([`${category}`,value])
      }
      return updatedFilters;
    });
  
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(null)
    // Notify parent about filter reset
  };

  const checkCheckbox=(e)=>{
    console.log(e)
  }

  const filterOptions = {
    price: [
      { id: 'price-1', label: '₹0 - ₹500' },
      { id: 'price-2', label: '₹500 - ₹1000' },
      { id: 'price-3', label: '₹1000 - ₹1500' },
      { id: 'price-4', label: '₹1500 - ₹2000' },
      { id: 'price-5', label: 'More than ₹2000' }
    ],
    color: [
      { id: 'color-aloe-green', label: 'Aloe Green' },
      { id: 'color-apricot-crush', label: 'Apricot Crush' },
      { id: 'color-authentic', label: 'Authentic/Never Say No' },
      { id: 'color-be-free', label: 'Be Free/Believe' },
      { id: 'color-black', label: 'Black' }
    ],
    size: [
      { id: 'size-s', label: 'S' },
      { id: 'size-m', label: 'M' },
      { id: 'size-l', label: 'L' },
      { id: 'size-xl', label: 'XL' },
      { id: 'size-xxl', label: 'XXL' },
      { id: 'size-xxxl', label: 'XXXL' },
      { id: 'size-4xl', label: '4XL' },
      { id: 'size-5xl', label: '5XL' },
      { id: 'size-6xl', label: '6XL' },
      { id: 'size-7xl', label: '7XL' }
    ],
    neck: [
      { id: 'neck-round', label: 'Round Neck' }
    ],
    sleeve: [
      { id: 'sleeve-short', label: 'Short Sleeves' }
    ],
    fit: [
      { id: 'fit-relaxed', label: 'Relaxed Fit' },
      { id: 'fit-oversized', label: 'Oversized Fit' }
    ],
    fabric: [
      { id: 'fabric-cotton', label: 'Cotton' }
    ],
    pattern: [
      { id: 'pattern-printed', label: 'Printed' },
      { id: 'pattern-solid', label: 'Solid' }
    ]
  };

  return (
    <aside className="filter-sidebar">
      <h2>Filters <button  className=" btn  clear-filters-button " style={{'marginLeft':'145px',color:'darkorange','outline':'none'}} onClick={clearFilters}>
        Clear All
      </button></h2>
      <hr />
      {Object.keys(filterOptions).map(category => (
        <div key={category} className="filter-section">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          {filterOptions[category].map(option => (
            <div key={option.id} className="filter-option">
              <input
                type="radio"
                id={option.id}  // Ensure unique id for label matching
                name={category}
                onChange={() => handleFilterChange(category, option.label)}
                checked={filters[category].includes(option.label)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
          <hr />
        </div>
      ))}
      
    </aside>
  );
};

export default FilterSidebar;
