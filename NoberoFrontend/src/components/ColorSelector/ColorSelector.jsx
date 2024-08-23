import React, { useState } from "react";
import "./ColorSelector.css"; // Import the CSS file for styling

const ColorSelector = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h2>Select Color (Availble) - {selectedColor || "None"}</h2>
      <div className="color-selector">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-button ${selectedColor === color ? "selected" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
