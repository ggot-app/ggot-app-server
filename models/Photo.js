const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  resistered_by: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User'
  },
  location: {
    type: Map,
    of: String
  },
  photo_url: {
    type: String,
    unique: true,
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
