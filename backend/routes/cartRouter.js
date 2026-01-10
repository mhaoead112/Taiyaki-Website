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
    await cartPost.populate('items.menuItemId');
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
  await cart.populate('items.menuItemId');
  res.json(cart);
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

// GET cart fees (VAT percent and delivery fee)
router.get('/fees', async (req, res) => {
  try {
    const vatPercent = parseFloat(process.env.VAT_PERCENT ?? '14');
    const deliveryFee = parseFloat(process.env.DELIVERY_FEE ?? '20');
    res.json({ vatPercent, deliveryFee });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching fees' });
  }
});

// DELETE clear cart by userId
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = [];
    await cart.save();
    await cart.populate('items.menuItemId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
