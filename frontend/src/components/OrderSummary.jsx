import React from "react";

const OrderSummary = ({ order }) => {
  const { name, phone, address, branch, items, totalPrice, createdAt } = order;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-30">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed ✅</h2>
      <p className="text-gray-600 mb-6">Thank you for your order, <span className="font-semibold">{name}</span>!</p>

      <div className="space-y-2">
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Branch:</strong> {branch}</p>
        <p><strong>Order Date:</strong> {new Date(createdAt).toLocaleString()}</p>
      </div>

      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Items Ordered</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-xl">
            <div className="flex justify-between">
              <span>{item.menuItemId.title} x {item.quantity}</span>
              <span>{item.menuItemId.price * item.quantity} EGP</span>
            </div>
            {item.menuItemId.extras.length > 0 && (
              <ul className="text-sm text-gray-500 ml-2 mt-1">
                {item.menuItemId.extras.map((extra, idx) => (
                  <li key={idx}>+ {extra.name} ({extra.price} EGP)</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right text-lg font-bold">
        Total: {totalPrice} EGP
      </div>
    </div>
  );
};

export default OrderSummary;
