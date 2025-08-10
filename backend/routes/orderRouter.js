const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Your Mongoose Order model
const mongoose = require('mongoose');
router.get('/:orderId' , async (req, res)=> {
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.orderId)
    const order = await Order.findOne({_id: objectId});
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.post("/", async (req, res) => {
  const { name, phone, address, branch, items, totalPrice } = req.body;

  if (!name || !phone || !address || !branch || !items || !totalPrice) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({ name, phone, address, branch, items, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
