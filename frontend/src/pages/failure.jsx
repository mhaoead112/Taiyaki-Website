// pages/payment/failed.jsx

import { useNavigate } from "react-router-dom";
import React from 'react'
export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Order Failed</h1>
        <p className="text-gray-700 mb-6">
          Something went wrong while processing your order.
          <br /> Please try again later.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-xl transition"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
