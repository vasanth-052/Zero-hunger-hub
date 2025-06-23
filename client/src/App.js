import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import FoodBankLocator from './components/FoodBankLocator/FoodBankLocator';
import DonationTracker from './components/DonationTracker/DonationTracker';
import VolunteerSignUp from './components/VolunteerSignUp/VolunteerSignUp';
import axios from 'axios';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    volunteers: 0,
    donations: 0,
    foodBanks: 0
  });

  useEffect(() => {
    // Fetch statistics for hero section
    const fetchStats = async () => {
      try {
        const [volunteersRes, donationsRes, foodBanksRes] = await Promise.all([
          axios.get('/api/volunteers'),
          axios.get('/api/donations'),
          axios.get('/api/foodBanks')
        ]);
        
        setStats({
          volunteers: volunteersRes.data.length,
          donations: donationsRes.data.length,
          foodBanks: foodBanksRes.data.length
        });
      } catch (error) {
        console.log('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const HeroSection = () => (
    <div className="hero-section">
      <h1 className="hero-title">Zero Hunger Hub</h1>
      <p className="hero-subtitle">
        Together, we can end hunger in our community. Join our mission to connect volunteers, 
        donors, and food banks to make a lasting impact.
      </p>
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">{stats.volunteers}+</span>
          <span className="stat-label">Volunteers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.donations}+</span>
          <span className="stat-label">Donations</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.foodBanks}+</span>
          <span className="stat-label">Food Banks</span>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <VolunteerSignUp />
              </>
            } />
            <Route path="/food-bank-locator" element={<FoodBankLocator />} />
            <Route path="/donation-tracker" element={<DonationTracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;