import { useState } from "react";
import React from 'react'
import {CircleDollarSign} from 'lucide-react'

import {CreditCard} from 'lucide-react'
export default function PaymentMethodSelect({ selected, onChange }) {
  const options = [
    { label: "Cash", value: "cash" ,icon: <CircleDollarSign /> },
    { label: "Credit Card", value: "credit_card" ,icon: <CreditCard />},
  ];

  return (
    <div className="space-y-2">
      <p className="text-lg font-medium">Select Payment Method:</p>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border transition
              ${
                selected === option.value
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white border-gray-300 text-gray-800 hover:border-red-400"
              }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={option.value}
              checked={selected === option.value}
              onChange={() => {console.log(option.value);onChange(option.value)}}
              className="hidden"
            />
            <span className="text-sm font-semibold">{option.label} </span> <span>{option.icon}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
