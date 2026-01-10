// pages/payment/success.jsx
import axios from 'axios';
import { buildApiUrl } from '../utils/apiClient';
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
    if (!api || !orderId || orderId === 'null') {
      return;
    }
    axios.get(buildApiUrl(api, `/api/order/${orderId}`)).then((res)=> setOrder(res.data))
  }, []);

  return (
    <>
    <div className="min-h-screen bg-black">
          <Navbar />
{order ? (
  <OrderSummary order={order} />
) : (
  <div className="text-white p-6">
    <p>Loading order details...</p>
    <p className="text-gray-400 text-sm mt-2">If this takes too long, please return to the menu or check your orders.</p>
  </div>
)}
    </div>
    </>
  );
}
