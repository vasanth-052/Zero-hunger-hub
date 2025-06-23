import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍽️</span>
          Zero Hunger Hub
        </Link>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            🤝 Volunteer Sign-Up
          </Link>
          <Link 
            to="/food-bank-locator" 
            className={`nav-link ${isActive('/food-bank-locator')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            📍 Food Bank Locator
          </Link>
          <Link 
            to="/donation-tracker" 
            className={`nav-link ${isActive('/donation-tracker')}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            💝 Donation Tracker
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;