const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    require: true
  },
  parent: {type: Schema.Types.ObjectId, ref: 'Category'},
  children: [{type: Schema.Types.ObjectId, ref: 'Category'}]
})

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
  categories: { type: Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  reviews: [reviewsSchema],
  createdOn: {
    type: Date,
    'default': Date.now
  }  
})


mongoose.model('Article', articlesSchema)
mongoose.model('Category', categoriesSchema)
