const express = require('express');
const router = express.Router();
const branchItem = require('../models/branchItems');

router.get('/', async (req, res) => {
  try {
    const branchItems = await branchItem.find();
    res.json(branchItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
