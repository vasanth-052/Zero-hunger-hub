import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodBankLocator.css';

const FoodBankLocator = () => {
  const [foodBanks, setFoodBanks] = useState([]);
  const [filteredFoodBanks, setFilteredFoodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFoodBanks();
  }, []);

  useEffect(() => {
    filterFoodBanks();
  }, [searchTerm, foodBanks]);

  const fetchFoodBanks = async () => {
    try {
      const response = await axios.get('/api/foodBanks');
      setFoodBanks(response.data);
      setFilteredFoodBanks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError('Failed to load food banks');
      setLoading(false);
    }
  };

  const filterFoodBanks = () => {
    if (!searchTerm) {
      setFilteredFoodBanks(foodBanks);
      return;
    }

    const filtered = foodBanks.filter(fb =>
      fb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoodBanks(filtered);
  };

  const handleGetDirections = (lat, lng, name) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  const handleContact = (name) => {
    // In a real app, this would open a contact form or show contact details
    alert(`Contact information for ${name} would be displayed here.`);
  };

  if (loading) {
    return (
      <div className="food-bank-locator-container">
        <div className="loading">
          Finding food banks near you...
        </div>
      </div>
    );
  }

  return (
    <div className="food-bank-locator-container">
      <div className="locator-header">
        <h2>📍 Find Food Banks Near You</h2>
        <p className="locator-subtitle">
          Locate food banks in your area and get directions to receive assistance
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}
      
      {foodBanks.length > 0 && (
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {filteredFoodBanks.length > 0 && (
        <div className="food-banks-count">
          Found {filteredFoodBanks.length} food bank{filteredFoodBanks.length !== 1 ? 's' : ''} 
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
      
      {filteredFoodBanks.length === 0 && !loading ? (
        <div className="no-data">
          {searchTerm ? (
            <>
              <p>No food banks found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Show All Food Banks
              </button>
            </>
          ) : (
            <p>No food banks available at the moment.</p>
          )}
        </div>
      ) : (
        <div className="food-banks-grid">
          {filteredFoodBanks.map(fb => (
            <div key={fb._id} className="food-bank-card">
              <div className="card-image">
                <div className="card-icon">🏪</div>
              </div>
              
              <div className="card-content">
                <h3>{fb.name}</h3>
                
                <div className="address">
                  <span className="address-icon">📍</span>
                  <span>{fb.address}</span>
                </div>
                
                <div className="coordinates">
                  <div className="coordinate-item">
                    <span className="coordinate-label">Latitude</span>
                    <span className="coordinate-value">{fb.coordinates.lat.toFixed(6)}</span>
                  </div>
                  <div className="coordinate-item">
                    <span className="coordinate-label">Longitude</span>
                    <span className="coordinate-value">{fb.coordinates.lng.toFixed(6)}</span>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button 
                    className="directions-btn"
                    onClick={() => handleGetDirections(fb.coordinates.lat, fb.coordinates.lng, fb.name)}
                  >
                    🗺️ Get Directions
                  </button>
                  <button 
                    className="contact-btn"
                    onClick={() => handleContact(fb.name)}
                  >
                    📞 Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodBankLocator;