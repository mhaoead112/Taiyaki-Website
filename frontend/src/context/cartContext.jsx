// src/context/CartContext.js
import { createContext, useContext, useState } from "react";
import React from 'react'
const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCartf = (item) => {
const existing = cart.find((i) => i._id === item._id);  
    if (existing) {
        console.log(`${existing.qty} ${existing.title} to cart`)
        console.log(cart)
        setCart(cart.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
        
      setCart([...cart, { ...item, qty: 1 }]);
      console.log(cart)
    }  };

  const value = {
    cart,
    addToCartf,
    itemCount: cart.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
