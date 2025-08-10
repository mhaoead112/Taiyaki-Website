// pages/payment/success.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react'
import OrderSummary from '../components/OrderSummary';
import '../App.css';
import Navbar from '../components/NavBar';

export default function PaymentSuccess() {
  const api = import.meta.env.VITE_API_URL;

     const [order, setOrder] = useState(null);
  useEffect(() => {
    // Fetch order details if needed (e.g., from session or query params)
    const orderId = localStorage.getItem('orderId');
    axios.get(`${api}/api/order/${orderId}`).then((res)=> setOrder(res.data))
  }, []);

  return (
    <>
    <div className="min-h-screen bg-black">
          <Navbar />
{order ? <OrderSummary order={order} /> : <p>Loading...</p>}
    </div>
    </>
  );
}
