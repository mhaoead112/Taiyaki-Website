import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react'
export default function MenuItemModal({ isOpen, onClose, item, onConfirm }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  // Update total price when dependencies change
  useEffect(() => {
    if (!item) return;
    const basePrice = item.price || 0;
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price || 0), 0);
    const finalTotal = (basePrice + extrasTotal) * quantity;

    setTotal(Number.isFinite(finalTotal) ? finalTotal : 0);
}, [selectedExtras, quantity, item]);
      
  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
    return total;
  };

  const handleConfirm = () => {
    onConfirm({
      item,
      quantity,
      extras: selectedExtras,
      comment,
      totalPrice: total,
    });
    setSelectedExtras([]);
    setQuantity(1);
    setComment('');
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="bg-white text-black p-6 rounded-lg shadow-2xl max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-4">Customize {item.name}</h2>

          {/* Extras */}
          <div className="mb-4">
            <p className="font-medium mb-2">Extras:</p>
            {item.extras.map((extra) => (
              <label
                key={extra.name}
                className="flex justify-between items-center text-sm mb-2"
              >
                <span>{extra.name} (+{extra.price} EGP)</span>
                <input
                  type="checkbox"
                  checked={!!selectedExtras.find((e) => e.name === extra.name)}
                  onChange={() => {toggleExtra(extra); console.log(total)}}
                  className="accent-red-600"
                />
              </label>
            ))}
          </div>

          {/* Comment Box (Improved UI) */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Special Instructions:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="No onions, extra chocolate, etc."
              className="w-full rounded-md p-3 border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
            />
          </div>

          {/* Quantity Controls */}
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
              >
                −
              </button>
              <span className="min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="mb-6 font-semibold text-right text-lg text-red-600">
            Total: {total.toFixed(2)} EGP
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-all"
          >
            Add to Cart
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
