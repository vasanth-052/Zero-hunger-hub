import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import FoodBankLocator from './components/FoodBankLocator/FoodBankLocator';
import DonationTracker from './components/DonationTracker/DonationTracker';
import VolunteerSignUp from './components/VolunteerSignUp/VolunteerSignUp';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<VolunteerSignUp />} />
            <Route path="/food-bank-locator" element={<FoodBankLocator />} />
            <Route path="/donation-tracker" element={<DonationTracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;