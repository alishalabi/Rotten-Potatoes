const mongoose = require('mongoose');
const Comment = require('../models/comment.js')

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review;
