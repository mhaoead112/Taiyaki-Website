const express = require('express');
const router = express.Router();
const menu = [
  {
    "_id": "1",
    "title": "King Bueno Mochi",
    "description": "A rich blend of chocolate and hazelnut.",
    "price": 90,
    "imageUrl": "https://example.com/kingbueno.png",
    "category": "Mochi Ice Cream",
    "extras": [
      { name: 'Nutella', price: 10 },
      { name: 'Caramel', price: 8 },
      { name: 'Whipped Cream', price: 6 },
    ]
  },
  {
    "_id": "2",
    "title": "Pineapple Mochi",
    "description": "Sweet pineapple with a spicy twist.",
    "price": 90,
    "imageUrl": "https://example.com/pineapple.png",
    "category": "Mochi Ice Cream",
    "extras": [
      { name: 'Nutella', price: 10 },
      { name: 'Caramel', price: 8 },
      { name: 'Whipped Cream', price: 6 },
    ]
  },
  {
    "_id": "3",
    "title": "Nutella Taiyaki",
    "description": "Fish-shaped pancake filled with Nutella.",
    "price": 70,
    "imageUrl": "https://example.com/nutella.png",
    "category": "Taiyaki",
    "extras": [
      { name: 'Nutella', price: 10 },
      { name: 'Caramel', price: 8 },
      { name: 'Whipped Cream', price: 6 },
    ]
  }
];
router.get('/', (req,res)=> {
        res.json(menu);
})
module.exports = router;