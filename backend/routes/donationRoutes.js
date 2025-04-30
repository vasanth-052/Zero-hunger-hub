// server/routes/donations.js

const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// GET all donations
router.get('/', (req, res) => {
  Donation.find()
    .then(donations => res.json(donations))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

// POST a new donation
router.post('/add', (req, res) => {
  const { donorName, amount, foodBankId } = req.body;

  // Validate amount
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid Amount', message: 'Donation amount must be a positive number.' });
  }

  const newDonation = new Donation({ donorName, amount, foodBankId });
  newDonation.save()
    .then(() => res.json('Donation added!'))
    .catch(err => res.status(500).json({ error: 'Internal Server Error', message: err.message }));
});

module.exports = router;
