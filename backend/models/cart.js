const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'menu'},
    extras: [{ name: String, price: Number }],
    quantity: { type: Number}
  }],
  createdAt: { type: Date, default: Date.now }
});


const cart = mongoose.model('cart', cartSchema , 'cart');
module.exports = cart;  