// models/menuItems.js

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  extras: {
    type: Array,
    required: false
  }
});



const menuItem = mongoose.model('menu', menuItemSchema, 'menu');
module.exports = menuItem;
