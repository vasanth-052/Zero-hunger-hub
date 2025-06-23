import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Zero Hunger Hub
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Volunteer Sign-Up
          </Link>
          <Link to="/food-bank-locator" className="nav-link">
            Food Bank Locator
          </Link>
          <Link to="/donation-tracker" className="nav-link">
            Donation Tracker
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;