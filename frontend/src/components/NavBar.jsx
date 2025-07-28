// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';

export default function Navbar() {
  const [totalItems, setTotalItems] = useState();

  useEffect(() => {
    const fetchCartSummary = async () => {
      try {
        const userId = localStorage.getItem('guestId'); // function to get guestId from cookies or localStorage
        const { data } = await axios.get(`http://localhost:3000/api/cart/summary/${userId}`);
        setTotalItems(data.totalItems);
      } catch (err) {
        console.error('Failed to fetch cart summary:', err);
      }
    };

    fetchCartSummary();
  }, []);
  return (
    <nav className="bg-black  shadow font-[Montserrat] drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 justify-start"><img src="https://i.ibb.co/1f7wGNp9/Taiyaki-Logo.png" alt="" className='h-18 mx-auto object-contain'/></Link>
        <div className="space-x-6">
          <Link to="/menu" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">Menu</Link>
          <Link to="/branches" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">Branches</Link>
          <Link to="/about" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">About</Link>
          <Link to="/cart" className="inline-flex items-center justify-center mt-3 text-white hover:text-red-500 transition"><ShoppingCart size={30} /> {totalItems > 0 && (<span className="relative -top-2 -left-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg animate-pulse">{totalItems}</span>)}</Link>
        </div>
      </div>
    </nav>
  );
}
