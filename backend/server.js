const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Import routes
const foodBankRoutes = require('./routes/foodBankRoutes');
const donationRoutes = require('./routes/donationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

// Use routes
app.use('/api/foodBanks', foodBankRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Error Handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
