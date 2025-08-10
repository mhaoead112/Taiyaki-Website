const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  branch: String,
  items: [
    {
      _id: String,
      menuItemId: {
      title: String,
      price: Number,
      extras:Array
      },
      quantity: Number
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('order', orderSchema, 'order');
module.exports = Order;
