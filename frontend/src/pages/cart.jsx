import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import React from 'react'
import Navbar from '../components/NavBar';
import { useCart } from '../context/cartContext';
const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useCart()
  console.log(cart);
  // Add state for quantities
  const [quantities, setQuantities] = useState([2, 2]);

  const [products,setProducts] = useState([
    {
      name: 'King Bueno Mochi',
      price: 90,
      image: '/king-bueno.png',
    },
    {
      name: 'Spicy Pineapple Mochi',
      price: 90,
      image: '/spicy-pineapple.png',
    },
  ])
  // setProducts(cart);
  // Update quantity for item
  const updateQty = (index, delta) => {
    setQuantities(prev =>
      prev.map((q, i) => (i === index ? Math.max(q + delta, 1) : q))
    );
  };

  const subtotal = products.reduce((acc, item, i) => acc + item.price * quantities[i], 0);
  const VAT = 40;
  const discount = -40;
  const total = subtotal + VAT + discount;

  return (
    <>
    <Navbar />
    <motion.div
      className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-8 items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cart Products */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl" />
                <div>
                  <p className="font-semibold">{item.item.title}</p>
                  <p className="text-sm text-gray-400">{item.item.price} EGP</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <button
                  onClick={() => updateQty(index, -1)}
                  className="px-2 hover:text-red-400"
                >
                  −
                </button>
                <span>{quantities[index]}</span>
                <button
                  onClick={() => updateQty(index, 1)}
                  className="px-2 hover:text-green-400"
                >
                  +
                </button>
              </div>
              <p>{quantities[index] * item.item.price}EGP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 w-full max-w-sm space-y-6">
        {/* Coupon */}
        <div>
          <h3 className="font-semibold text-lg">Coupon Code</h3>
          <p className="text-sm text-gray-400 mb-2">Enter your promo code</p>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl border-none bg-white/10 placeholder-gray-400 text-white"
            placeholder="Coupon code"
          />
          <button className="mt-2 w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-xl shadow-md">
            Apply
          </button>
        </div>

        {/* Cart Totals */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h4 className="font-bold mb-4">Cart Total</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span>{subtotal}EGP</span>
            </div>
            <div className="flex justify-between">
              <span>VAT</span>
              <span>{VAT}EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{discount}EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-white border-t border-white/10 pt-2">
              <span>Total</span>
              <span>{total}EGP</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={() => navigate('/payment')}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition shadow-xl"
        >
          Go to Payment
        </button>
      </div>
    </motion.div>
    </>
  );
};

export default Cart;
