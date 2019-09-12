const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
})


const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: String,
  count: {
    type: Number,
    'default': 0,
  },
  text: {
    type: String,
    'default': ''
  },
  categories: [String],
  tags: [String],
  reviews: [reviewsSchema],
  createdOn: {
    type: Date,
    'default': Date.now
  }  
})


mongoose.model('Article', articlesSchema)
