// routes/paymob.js
const express = require('express');
const router = express.Router();

router.post('/processed-callback', (req, res) => {
  console.log('Payment processed:', req.body);
  // Save to DB, update order status, etc.
  res.status(200).send('Processed callback received');
});

router.get('/response-callback', (req, res) => {
    if(req.query.success === 'true') {
    res.redirect('http://localhost:5173/payment/success');
    }else if(req.query.success === 'false') {
            res.redirect('http://localhost:5173/payment/faliure')
    }
  // Validate transaction outcome
});

module.exports = router;
