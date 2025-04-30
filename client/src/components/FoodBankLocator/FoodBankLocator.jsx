// client/src/components/FoodBankLocator/FoodBankLocator.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodBankLocator = () => {
  const [foodBanks, setFoodBanks] = useState([]);

  useEffect(() => {
    axios.get('/api/foodBanks')
      .then(response => setFoodBanks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Food Bank Locator</h2>
      {foodBanks.map(fb => (
        <div key={fb._id}>
          <h3>{fb.name}</h3>
          <p>{fb.address}</p>
          <p>Latitude: {fb.coordinates.lat}, Longitude: {fb.coordinates.lng}</p>
        </div>
      ))}
    </div>
  );
}

export default FoodBankLocator;
