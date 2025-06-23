// client/src/components/FoodBankLocator/FoodBankLocator.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodBankLocator.css';

const FoodBankLocator = () => {
  const [foodBanks, setFoodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/foodBanks')
      .then(response => {
        setFoodBanks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError('Failed to load food banks');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading food banks...</div>;
  }

  return (
    <div className="food-bank-locator-container">
      <h2>Food Bank Locator</h2>
      {error && <p className="error-message">{error}</p>}
      
      {foodBanks.length === 0 ? (
        <p className="no-data">No food banks available at the moment.</p>
      ) : (
        <div className="food-banks-grid">
          {foodBanks.map(fb => (
            <div key={fb._id} className="food-bank-card">
              <h3>{fb.name}</h3>
              <p className="address">{fb.address}</p>
              <div className="coordinates">
                <span>Latitude: {fb.coordinates.lat}</span>
                <span>Longitude: {fb.coordinates.lng}</span>
              </div>
              <button 
                className="directions-btn"
                onClick={() => {
                  const url = `https://www.google.com/maps?q=${fb.coordinates.lat},${fb.coordinates.lng}`;
                  window.open(url, '_blank');
                }}
              >
                Get Directions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodBankLocator;