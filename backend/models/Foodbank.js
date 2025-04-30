// server/models/FoodBank.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodBankSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('FoodBank', FoodBankSchema);
