import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ userId, children }) => {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    axios.get(`/api/cart/${userId}`).then(res => setCart(res.data));
  }, [userId]);

  const addToCart = async (menuItemId, extras, quantity) => {
    const res = await axios.post(`/api/cart/${userId}`, { menuItemId, extras, quantity });
    setCart(res.data);
  };

  const clearCart = async () => {
    await axios.delete(`/api/cart/${userId}`);
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
