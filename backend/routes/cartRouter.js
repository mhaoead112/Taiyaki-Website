const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const mongoose = require('mongoose');

// GET all carts
router.get('/', async (req, res) => {
  try {
    const cartData = await Cart.find();
    res.json(cartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET cart by userId and populate menu items
router.get('/:userId', async (req, res) => {
  try {
    const cartData = await Cart.findOne({ userId: req.params.userId }).populate('items.menuItemId');
    res.json(cartData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add item to cart
router.post('/:userId', async (req, res) => {
        const { menuItemId, extras, quantity } = req.body.items;

  try {

    // Validate and convert quantity to number
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a valid positive number." });
    }

    let cartPost = await Cart.findOne({ userId: req.params.userId });

    if (!cartPost) {
      cartPost = new Cart({ userId: req.params.userId, items: [] });
    }

    const menuItemObjectId = new mongoose.Types.ObjectId(menuItemId);

    // Find existing item with same menuItemId and extras
    const index = cartPost.items.findIndex(item =>
      item.menuItemId === (menuItemObjectId) &&
      JSON.stringify(item.extras) === JSON.stringify(extras)
    );
if(cartPost.items.length === 0) {
    cartPost.items.push({
        menuItemId: menuItemObjectId,
        extras,
        quantity: parsedQuantity
      });
    } else {
    let itemFound = false;

for (let i = 0; i < cartPost.items.length; i++) {
  if (cartPost.items[i].menuItemId == menuItemId) {
    cartPost.items[i].quantity += parsedQuantity;
    itemFound = true;
    break; // ✅ exits loop after updating
  }
}

if (!itemFound) {
  cartPost.items.push({
    menuItemId: menuItemObjectId,
    extras,
    quantity: parsedQuantity
  });
}
    
    }
    await cartPost.save();
    res.json(cartPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.patch('/update-quantity', async (req, res) => {
    try {
  const {userId, menuItemId, quantity } = req.body;
//   const userId = req.cookies.guestId || req.user?.id;

  const cart = await Cart.findOne({ userId });

  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const itemIndex = cart.items.findIndex(item => item.menuItemId == menuItemId);
  if (itemIndex === -1) return res.status(404).json({ error: "Item not in cart" });

  if (quantity < 1) {
    // Remove item if quantity < 1
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();
  res.json(cart.populate('items.menuItemId'));
    } catch (error) {
            res.status(500).json({ error: error.message });

    }
    
});
router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ totalItems: 0 });

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    res.json({ totalItems });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart summary' });
  }
});
module.exports = router;
