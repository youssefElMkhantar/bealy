const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('food', foodSchema);
