import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import axios from 'axios';


export default function Branches() {
  const api = import.meta.env.VITE_API_URL;

    const [branches,setBranches] = useState([]);
    useEffect(() => {
  axios.get(`${api}/api/branches`)
    .then(res => {
      setBranches(res.data.map((b, i) => ({
  ...b,
  key: i,
})));
       console.log(branches);
    })
    .catch(err => console.error(err));
}, []);
  return (
    <>
    <Navbar />
    <section className="bg-black text-white py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 text-white drop-shadow-lg">
        Our Branches
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {branches.map((branch) => (
          <div
            key={branch.key}
            className="bg-zinc-900 border-2 border-red-600 rounded-xl shadow-lg hover:shadow-red-600/40 transition duration-300 overflow-hidden"
          >
            {/* Map preview */}
            <iframe
              title={`Map of ${branch.name || 'Mall of Egypt'}`}
              src={
                branch.mapEmbedUrl ||
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.835328962804!2d31.01760657514616!3d29.974156623960576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585b8559dfec8f%3A0x5971f1cb99b3c269!2sMall%20of%20Egypt!5e0!3m2!1sen!2seg!4v1629810325701!5m2!1sen!2seg'
              }
              className="w-full h-56 sm:h-64 md:h-60 lg:h-56"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Details */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {branch.name || 'Mall of Egypt'}
              </h3>
              <p className="text-md text-gray-300">
                {branch.description || 'Gate C2-Level 2'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </>
  );
}
