const axios = require('axios');
const express = require('express');
const router = express.Router();
async function getPaymobToken() {
  const response = await axios.post('https://accept.paymob.com/api/auth/tokens', {
    api_key: process.env.PAYMOB_API_KEY
  });

  return response.data.token;
}
async function createPaymobOrder(token, amountCents) {
  const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
    auth_token: token,
    delivery_needed: false,
    amount_cents: amountCents, // e.g., 100.00 EGP = 10000
    currency: "EGP",
    items: []
  });

  return response.data.id;
}
async function getPaymentKey(token, orderId, amountCents) {
  const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
    auth_token: token,
    amount_cents: amountCents,
    expiration: 3600,
    order_id: orderId,
    billing_data: {
      apartment: "NA",
      email: "user@example.com",
      floor: "NA",
      first_name: "Mohamed",
      last_name: "Hesham",
      phone_number: "+201111111111",
      street: "NA",
      building: "NA",
      city: "Cairo",
      country: "EG",
      state: "Cairo"
    },
    currency: "EGP",
    integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID),
  });

  return response.data.token;
}
router.post('/', async (req, res) => {
  const { amount } = req.body;

  try {
    const token = await getPaymobToken();
    const orderId = await createPaymobOrder(token, amount);
    const paymentKey = await getPaymentKey(token, orderId, amount);

    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;

    res.json({ redirectUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment setup failed" });
  }
});
module.exports = router
