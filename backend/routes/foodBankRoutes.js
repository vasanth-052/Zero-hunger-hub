// server/routes/foodBanks.js

const express = require('express');
const router = express.Router();
const FoodBank = require('../models/FoodBank');

// GET all food banks
router.get('/', (req, res) => {
  FoodBank.find()
    .then(foodBanks => res.json(foodBanks))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

// POST a new food bank
router.post('/add', (req, res) => {
  const { name, address, coordinates } = req.body;
  
  // Validate coordinates
  if (!isValidCoordinates(coordinates)) {
    return res.status(400).json({ error: 'Invalid Coordinates', message: 'Coordinates must include valid lat and lng values.' });
  }

  const newFoodBank = new FoodBank({ name, address, coordinates });
  newFoodBank.save()
    .then(() => res.json('Food bank added!'))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

// Function to validate coordinates
function isValidCoordinates(coordinates) {
  if (!coordinates || typeof coordinates.lat !== 'number' || typeof coordinates.lng !== 'number') {
    return false;
  }
  // Add more validation logic if necessary
  return true;
}

module.exports = router;