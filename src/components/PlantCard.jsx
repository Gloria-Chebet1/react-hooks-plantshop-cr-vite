import React, { useState } from "react";

function PlantCard({ plant }) {
  const [inStock, setInStock] = useState(true);

  function handleClick() {
    setInStock((prev) => !prev);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>

      <button
        className={inStock ? "primary" : ""}
        onClick={handleClick}
      >
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;