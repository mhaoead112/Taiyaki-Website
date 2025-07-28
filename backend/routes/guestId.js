const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
router.get('/init' , (req , res) => {
      const guestId = uuidv4();

    res.cookie('guestId', guestId, {
  httpOnly: true,
  secure: true, 
  maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
});
 res.status(200).json({ guestId });
})
module.exports = router;