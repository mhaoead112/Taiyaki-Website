const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItems');

router.get('/', async (req, res) => {
  try {
    const menuItems = await menuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
