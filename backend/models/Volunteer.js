const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  foodBankId: {
    type: Schema.Types.ObjectId,
    ref: 'FoodBank',
    required: true
  }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
