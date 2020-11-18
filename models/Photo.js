const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  resistered_by: {
    type: String,
    required: true
  },
  location: {
    type: Array,
    required: true,
    trim: true
  },
  photo_url_list: {
    type: Array,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  published_at: {
    type: Date,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Photo', photoSchema);
