import { Link } from "react-router-dom";
import React from 'react'
import { ArrowUp } from "lucide-react";
import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10">
      {/* Top border line */}
      <div className="w-full border-t-2 border-red-600 mb-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* Branding + Mission */}
        <div>
            <img src="https://i.ibb.co/1f7wGNp9/Taiyaki-Logo.png" alt="" className='h-18 mb-10 object-contain'/>
          <p className="text-sm leading-relaxed text-gray-300">
            Bringing the joy of traditional Japanese taiyaki to modern palates.
            Handcrafted with care, filled with flavor, and served with love.
          </p>

          {/* Social icons - placeholders */}
          <div className="flex mt-4 space-x-4">
            <Link to="https://www.instagram.com/taiyakiegypt/" aria-label="Instagram"><div className="w-5 h-5 rounded-full" >
                    <Instagram />
                </div> </Link>
            <Link to="https://www.facebook.com/Taiyakiegypt/" aria-label="Facebook"><div className="w-5 h-5 rounded-full" >
                    <Facebook/>
                </div></Link>
          </div>

          {/* Back to Top Button */}
          <div className="mt-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" /> Back to Top
            </button>
          </div>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-4">Site Map</h3>
          <div className="flex flex-col space-y-2 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/menu" className="hover:underline">Menu</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/branches" className="hover:underline">Branches</Link>

          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold text-red-500 mb-4">Legal</h3>
          <div className="flex flex-col space-y-2 text-sm">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/cookies" className="hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10 pb-6">
        &copy; 2024 TAIYAKI. All Rights Reserved.
      </div>
    </footer>
  );
}
