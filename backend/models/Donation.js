// server/models/Donation.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  donorName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Donation amount must be a positive number.'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  foodBankId: {
    type: Schema.Types.ObjectId,
    ref: 'FoodBank',
    required: true
  }
});

module.exports = mongoose.model('Donation', DonationSchema);
