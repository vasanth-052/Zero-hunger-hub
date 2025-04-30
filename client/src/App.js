import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodBankLocator from './components/FoodBankLocator/FoodBankLocator';
import DonationTracker from './components/DonationTracker/DonationTracker';
import VolunteerSignUp from './components/VolunteerSignUp/VolunteerSignUp';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/food-bank-locator" element={<FoodBankLocator />} />
        <Route path="/donation-tracker" element={<DonationTracker />} />
        <Route path="/" element={<VolunteerSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
