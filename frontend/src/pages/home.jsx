import React, { Component } from "react";
import Navbar from "../components/NavBar";
import App from './../App';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './../components/Footer';
import axios from "axios";


const Home = () => {
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
  AOS.init({ duration: 1000, once: false });
}, []);
  const featuredItems = [
  {
    title: 'UNICORN Frappuccino',
    img: 'https://i.ibb.co/VWy46c43/484469889-18350343745195615-8444838219776569930-n.jpg',
  },
  {
    title: 'SOBIA TAPIOCA',
    img: 'https://i.ibb.co/VWy46c43/484469889-18350343745195615-8444838219776569930-n.jpg',
  },
  {
    title: 'MATCHA BLENDED',
    img: 'https://i.ibb.co/VWy46c43/484469889-18350343745195615-8444838219776569930-n.jpg',
  }, {
  title: 'MATCHA BLENDED',
    img: 'https://i.ibb.co/VWy46c43/484469889-18350343745195615-8444838219776569930-n.jpg',
  }
];
useEffect(() => {
   axios.get(`${api}/api/guest/init`).then (res => localStorage.setItem('guestId', res.data.guestId))
  },[])
    return (
      <>
      <Navbar />
<section
  className=" w-full min-h-[91vh] bg-black text-white bg-fill bg-center flex items-center px-8 pt-0 bg-no-repeat"
  style={{ backgroundImage: "url('https://i.ibb.co/S7966Hzs/Taiyakibgimg.jpg')"}}>
  {/* Dark Overlay */}
  <div className="" />

  {/* Content */}
  <div className="relative z-10 max-w-xl space-y-6">
    {/* Title */}
    <h1 className="text-5xl font-extrabold leading-snug">
      A SCOPE OF LOVE FROM <br />
      <span className="text-red-600">JAPANESE DESSERT</span> <br />
      FOR YOU
    </h1>

    {/* Description */}
    <p className="text-xl text-gray-300 leading-relaxed">
      Black ice cream is a type of ice cream that gets its dark, often jet black color
      from activated charcoal, typically derived from coconut shells or other carbon-rich materials.
    </p>

    {/* Button */}
              <Link to="/menu">   <button className="drop-shadow-[0_0_12px_rgba(255,0,0,0.7)] mt-20 bg-black text-white border border-red-600 px-6  text-2xl font-semibold rounded-md hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/40 border-l-10 border-b-10 border-red-500 rounded-lg shadow-md p-4 hover:shadow-red-500/40 transition cursor-pointer ">
      ORDER NOW
    </button></Link>
    
 
  </div>
</section>
<section className="bg-black text-white py-20 px-6 text-center">
      {/* Title */}
      <h2 className="text-3xl font-extrabold tracking-widest text-white mb-12 drop-shadow"  data-aos="fade-up">
        FEATURED PRODUCTS
      </h2>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {featuredItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-xl border-t-4 border-red-600 max-w-xs transition hover:scale-105 duration-300" data-aos="zoom-in" data-aos-delay={`${(index+1) * 300}`}

          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full object-cover h-[400px]"
            />
          </div>
        ))}
      </div>

      {/* View Menu Button */}
      <Link to="/menu">
      <div className="mt-16" data-aos="fade-up">
        <button className="group inline-flex items-center text-white text-xl font-semibold px-10 py-4 border border-red-600 rounded-md hover:bg-red-600 hover:border-red-500 transition-all shadow-lg drop-shadow-[0_0_12px_rgba(255,0,0,0.7)] mt-20 bg-black text-white border border-red-600 px-6  text-2xl font-semibold rounded-md hover:bg-red-600 transition-all shadow-lg hover:shadow-red-500/40 border-l-6 border-b-6 border-red-500 rounded-lg shadow-md p-4 hover:shadow-red-500/40 transition cursor-pointer">
          View Menu
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      </Link>
    </section>
    <Footer />
      </>
    )
}
export default Home;
