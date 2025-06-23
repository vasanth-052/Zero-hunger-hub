// server/routes/volunteers.js

const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// GET all volunteers
router.get('/', (req, res) => {
  Volunteer.find()
    .populate('foodBankId', 'name address')
    .then(volunteers => res.json(volunteers))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

// POST a new volunteer
router.post('/add', (req, res) => {
  const { name, email, phone, availability, foodBankId } = req.body;
  
  if (!foodBankId) {
    return res.status(400).json({ error: 'Missing Food Bank', message: 'Please select a food bank.' });
  }

  const newVolunteer = new Volunteer({ name, email, phone, availability, foodBankId });

  newVolunteer.save()
    .then(() => res.json('Volunteer added!'))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

module.exports = router;