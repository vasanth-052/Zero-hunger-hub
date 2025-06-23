import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolunteerSignUp.css';

const VolunteerSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    foodBankId: ''
  });
  const [foodBanks, setFoodBanks] = useState([]);
  const [signUpMessage, setSignUpMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.get('/api/foodBanks')
      .then(response => setFoodBanks(response.data))
      .catch(error => {
        console.log(error);
        setError('Failed to load food banks');
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSignUpMessage('');
    setIsSubmitting(true);

    if (!formData.foodBankId) {
      setError('Please select a food bank');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('/api/volunteers/add', formData);
      setSignUpMessage('🎉 Welcome to our volunteer community! Thank you for joining our mission to end hunger.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        availability: '',
        foodBankId: ''
      });
    } catch (error) {
      console.log(error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="volunteer-signup-container">
      <div className="volunteer-header">
        <h2>🤝 Join Our Volunteer Community</h2>
        <p className="volunteer-subtitle">
          Make a difference in your community by volunteering at local food banks
        </p>
      </div>
      
      <form className="volunteer-form" onSubmit={handleSignUpSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>👤 Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>📧 Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>📱 Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone} 
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>⏰ Availability</label>
            <input 
              type="text" 
              name="availability"
              value={formData.availability} 
              onChange={handleInputChange}
              placeholder="e.g., Weekends, Evenings"
              required 
            />
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
            <option value="">Choose a food bank to volunteer with...</option>
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
              <span className="loading-spinner"></span> Signing Up...
            </>
          ) : (
            'Join as Volunteer'
          )}
        </button>
        
        {signUpMessage && <div className="message success-message">{signUpMessage}</div>}
        {error && <div className="message error-message">{error}</div>}
      </form>
      
      <div className="volunteer-benefits">
        <h3 className="benefits-title">Why Volunteer With Us?</h3>
        <ul className="benefits-list">
          <li className="benefit-item">
            <span className="benefit-icon">❤️</span>
            <span>Make a real impact in your community</span>
          </li>
          <li className="benefit-item">
            <span className="benefit-icon">🤝</span>
            <span>Meet like-minded people</span>
          </li>
          <li className="benefit-item">
            <span className="benefit-icon">📈</span>
            <span>Gain valuable experience</span>
          </li>
          <li className="benefit-item">
            <span className="benefit-icon">🏆</span>
            <span>Flexible scheduling</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VolunteerSignUp;