// client/src/components/DonationTracker/DonationTracker.js
import './DonationTracker.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationTracker = () => {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(0);
  const [donationMessage, setDonationMessage] = useState('');

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/donations/add', { donorName, amount })
      .then(() => {
        setDonationMessage('Donation successfully pledged!');
        setDonorName('');
        setAmount(0);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    axios.get('/api/donations')
      .then(response => setDonations(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Donation Tracker</h2>
      <form onSubmit={handleDonationSubmit}>
        <label>
          Donor Name:
          <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} required />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Pledge Donation</button>
      </form>
      <p>{donationMessage}</p>
      <h3>Donation History:</h3>
      <ul>
        {donations.map(donation => (
          <li key={donation._id}>{donation.donorName}: ${donation.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default DonationTracker;
