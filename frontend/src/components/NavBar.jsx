// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-black  shadow font-[Montserrat] drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 justify-start"><img src="https://i.ibb.co/1f7wGNp9/Taiyaki-Logo.png" alt="" className='h-18 mx-auto object-contain'/></Link>
        <div className="space-x-6">
          <Link to="/menu" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">Menu</Link>
          <Link to="/branches" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">Branches</Link>
          <Link to="/about" className="text-xl font-bold text-white hover:text-red-500 transition drop-shadow-[0_0_12px_rgba(255,0,0,0.7)]">About</Link>
          <Link to="/cart" className="inline-flex items-center justify-center mt-3 text-white hover:text-red-500 transition"><ShoppingCart size={30} /></Link>
        </div>
      </div>
    </nav>
  );
}
