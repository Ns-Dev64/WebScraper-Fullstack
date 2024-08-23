import React, { useState } from "react";
import "./SizeSelector.css"; // Optional for custom styling

const SizeSelector = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="size-selector">
      {sizes.map((size) => (
        <button
          key={size}
          className={`size-button ${selectedSize === size ? "selected" : ""}`}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
