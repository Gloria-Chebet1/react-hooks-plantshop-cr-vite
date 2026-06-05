import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH plants on load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then(setPlants);
  }, []);

  // SEARCH filter
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  // ADD plant
  function addPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // TOGGLE stock
  function toggleStock(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id
          ? { ...plant, isSoldOut: !plant.isSoldOut }
          : plant
      )
    );
  }

  return (
    <main>
      <Search search={search} onSearchChange={setSearch} />

      <NewPlantForm onAddPlant={addPlant} />

      <PlantList plants={filteredPlants} onToggleStock={toggleStock} />
    </main>
  );
}

export default PlantPage;