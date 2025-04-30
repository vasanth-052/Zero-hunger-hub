// server/routes/volunteers.js

const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// GET all volunteers
router.get('/', (req, res) => {
  Volunteer.find()
    .then(volunteers => res.json(volunteers))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST a new volunteer
router.post('/add', (req, res) => {
  const { name, email, phone, availability } = req.body;
  const newVolunteer = new Volunteer({ name, email, phone, availability });

  newVolunteer.save()
    .then(() => res.json('Volunteer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
