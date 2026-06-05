import React, { useEffect, useState } from "react";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // form state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name,
      image,
      price,
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => setPlants([...plants, data]));

    setName("");
    setImage("");
    setPrice("");
  }

  function toggleStock(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id
          ? { ...plant, isSoldOut: !plant.isSoldOut }
          : plant
      )
    );
  }

  return (
    <main>
      {/* SEARCH */}
      <div className="searchbar">
        <label htmlFor="search">Search Plants:</label>
        <input
          id="search"
          placeholder="Type a name to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Plant</button>
      </form>

      {/* PLANTS LIST */}
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <li key={plant.id} data-testid="plant-item">
            <h4>{plant.name}</h4>
            <img src={plant.image} alt={plant.name} />
            <p>Price: {plant.price}</p>

            <button onClick={() => toggleStock(plant.id)}>
              {plant.isSoldOut ? "Out of Stock" : "In Stock"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default PlantPage;