// client/src/components/DonationTracker/DonationTracker.js
import './DonationTracker.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationTracker = () => {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [foodBankId, setFoodBankId] = useState('');
  const [foodBanks, setFoodBanks] = useState([]);
  const [donationMessage, setDonationMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch donations
    axios.get('/api/donations')
      .then(response => setDonations(response.data))
      .catch(error => {
        console.log(error);
        setError('Failed to load donations');
      });

    // Fetch food banks
    axios.get('/api/foodBanks')
      .then(response => setFoodBanks(response.data))
      .catch(error => {
        console.log(error);
        setError('Failed to load food banks');
      });
  }, []);

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setError('');
    setDonationMessage('');

    const donationAmount = parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    if (!foodBankId) {
      setError('Please select a food bank');
      return;
    }

    axios.post('/api/donations/add', { 
      donorName, 
      amount: donationAmount, 
      foodBankId 
    })
      .then(() => {
        setDonationMessage('Donation successfully pledged!');
        setDonorName('');
        setAmount('');
        setFoodBankId('');
        
        // Refresh donations list
        axios.get('/api/donations')
          .then(response => setDonations(response.data))
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        setError('Failed to submit donation. Please try again.');
      });
  };

  return (
    <div className="donation-tracker-container">
      <h2>Donation Tracker</h2>
      <form onSubmit={handleDonationSubmit}>
        <div className="form-group">
          <label>Donor Name:</label>
          <input 
            type="text" 
            value={donorName} 
            onChange={(e) => setDonorName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Amount ($):</label>
          <input 
            type="number" 
            step="0.01"
            min="0.01"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Select Food Bank:</label>
          <select 
            value={foodBankId} 
            onChange={(e) => setFoodBankId(e.target.value)} 
            required
          >
            <option value="">Choose a food bank...</option>
            {foodBanks.map(fb => (
              <option key={fb._id} value={fb._id}>
                {fb.name} - {fb.address}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit">Pledge Donation</button>
      </form>
      
      {donationMessage && <p className="success-message">{donationMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <h3>Donation History:</h3>
      <div className="donations-list">
        {donations.length === 0 ? (
          <p>No donations yet.</p>
        ) : (
          <ul>
            {donations.map(donation => (
              <li key={donation._id}>
                <strong>{donation.donorName}</strong>: ${donation.amount}
                {donation.foodBankId && (
                  <span className="food-bank-info">
                    {' '}to {donation.foodBankId.name}
                  </span>
                )}
                <span className="donation-date">
                  {' '}on {new Date(donation.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DonationTracker;