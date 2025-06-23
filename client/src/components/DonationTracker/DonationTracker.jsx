import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DonationTracker.css';

const DonationTracker = () => {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    donorName: '',
    amount: '',
    foodBankId: ''
  });
  const [foodBanks, setFoodBanks] = useState([]);
  const [donationMessage, setDonationMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonations: 0,
    averageDonation: 0
  });

  useEffect(() => {
    fetchDonations();
    fetchFoodBanks();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('/api/donations');
      setDonations(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.log(error);
      setError('Failed to load donations');
    }
  };

  const fetchFoodBanks = async () => {
    try {
      const response = await axios.get('/api/foodBanks');
      setFoodBanks(response.data);
    } catch (error) {
      console.log(error);
      setError('Failed to load food banks');
    }
  };

  const calculateStats = (donationsData) => {
    const totalAmount = donationsData.reduce((sum, donation) => sum + donation.amount, 0);
    const totalDonations = donationsData.length;
    const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

    setStats({
      totalAmount,
      totalDonations,
      averageDonation
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDonationMessage('');
    setIsSubmitting(true);

    const donationAmount = parseFloat(formData.amount);
    
    if (!donationAmount || donationAmount <= 0) {
      setError('Please enter a valid donation amount');
      setIsSubmitting(false);
      return;
    }

    if (!formData.foodBankId) {
      setError('Please select a food bank');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('/api/donations/add', { 
        donorName: formData.donorName, 
        amount: donationAmount, 
        foodBankId: formData.foodBankId 
      });
      
      setDonationMessage('🎉 Thank you for your generous donation! Your contribution will help feed families in need.');
      setFormData({
        donorName: '',
        amount: '',
        foodBankId: ''
      });
      
      // Refresh donations list
      fetchDonations();
    } catch (error) {
      console.log(error);
      setError('Failed to submit donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="donation-tracker-container">
      <div className="donation-header">
        <h2>💝 Make a Donation</h2>
        <p className="donation-subtitle">
          Your generosity helps provide meals to families in need
        </p>
      </div>
      
      <form className="donation-form" onSubmit={handleDonationSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>👤 Donor Name</label>
            <input 
              type="text" 
              name="donorName"
              value={formData.donorName} 
              onChange={handleInputChange}
              placeholder="Enter your name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>💰 Donation Amount</label>
            <div className="amount-input">
              <input 
                type="number" 
                name="amount"
                step="0.01"
                min="0.01"
                value={formData.amount} 
                onChange={handleInputChange}
                placeholder="0.00"
                required 
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label>🏢 Select Food Bank</label>
          <select 
            name="foodBankId"
            value={formData.foodBankId} 
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a food bank to support...</option>
            {foodBanks.map(fb => (
              <option key={fb._id} value={fb._id}>
                {fb.name} - {fb.address}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span> Processing...
            </>
          ) : (
            'Make Donation'
          )}
        </button>
        
        {donationMessage && <div className="message success-message">{donationMessage}</div>}
        {error && <div className="message error-message">{error}</div>}
      </form>
      
      <div className="donations-section">
        <h3 className="donations-title">📊 Donation Impact</h3>
        
        <div className="donations-stats">
          <div className="stat-card">
            <span className="stat-value">${stats.totalAmount.toFixed(2)}</span>
            <span className="stat-label">Total Raised</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalDonations}</span>
            <span className="stat-label">Total Donations</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">${stats.averageDonation.toFixed(2)}</span>
            <span className="stat-label">Average Donation</span>
          </div>
        </div>
        
        <div className="donations-list">
          {donations.length === 0 ? (
            <div className="no-donations">
              <p>🌟 Be the first to make a donation and start making a difference!</p>
            </div>
          ) : (
            donations.map(donation => (
              <div key={donation._id} className="donation-card">
                <div className="donation-info">
                  <span className="donor-name">{donation.donorName}</span>
                  <span className="donation-amount">${donation.amount.toFixed(2)}</span>
                </div>
                {donation.foodBankId && (
                  <div className="food-bank-info">
                    Donated to {donation.foodBankId.name}
                  </div>
                )}
                <div className="donation-date">
                  {new Date(donation.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationTracker;