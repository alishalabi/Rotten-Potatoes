// INITIALIZE
const mongoose = require('mongoose');

// DEFINE THE SCHEMA
const reviewSchema = mongoose.Schema({
  title: String,
  description: String,
  movieTitle: String
})

// INSTANTIATE THE MODEL
const Review = mongoose.model('Review', reviewSchema);

// EXPORT THE MODEL
module.exports = Review;
