const mongoose = require('mongoose');
const User = require('./userModel');

const ProductSchema = mongoose.Schema({
  name: {
    required: [true, 'Name NonDefined'],
    type: String,
  },
  brandName:{
type: String
  },
  description: {
    required: [true, 'description NonDefined'],
    type: String,
  },
  price: {
    required: [true, 'Name NonDefined'],
    maxLength: [5, 'price should be of max length 5'],
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: [{
    type: String,
    required: [true, 'Product category not defined'],
  }],
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: [true, 'PLease provide rating'],
      },
      comment: {
        type: String,
        required: [true, 'Please comment'],
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    maxLength: [4, 'Stock cannot exceed 4 charcters'],
    required: true,
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
