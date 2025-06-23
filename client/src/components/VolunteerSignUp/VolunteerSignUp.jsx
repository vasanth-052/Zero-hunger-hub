// client/src/components/VolunteerSignUp/VolunteerSignUp.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolunteerSignUp.css';

const VolunteerSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState('');
  const [foodBankId, setFoodBankId] = useState('');
  const [foodBanks, setFoodBanks] = useState([]);
  const [signUpMessage, setSignUpMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch food banks for selection
    axios.get('/api/foodBanks')
      .then(response => setFoodBanks(response.data))
      .catch(error => {
        console.log(error);
        setError('Failed to load food banks');
      });
  }, []);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSignUpMessage('');

    if (!foodBankId) {
      setError('Please select a food bank');
      return;
    }

    axios.post('/api/volunteers/add', { name, email, phone, availability, foodBankId })
      .then(() => {
        setSignUpMessage('Volunteer sign-up successful!');
        setName('');
        setEmail('');
        setPhone('');
        setAvailability('');
        setFoodBankId('');
      })
      .catch(error => {
        console.log(error);
        setError('Failed to sign up. Please try again.');
      });
  };

  return (
    <div className="volunteer-signup-container">
      <h2>Volunteer Sign-Up</h2>
      <form onSubmit={handleSignUpSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Phone:</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Availability:</label>
          <input 
            type="text" 
            value={availability} 
            onChange={(e) => setAvailability(e.target.value)} 
            placeholder="e.g., Weekends, Evenings, etc."
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
        
        <button type="submit">Sign Up</button>
      </form>
      
      {signUpMessage && <p className="success-message">{signUpMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default VolunteerSignUp;