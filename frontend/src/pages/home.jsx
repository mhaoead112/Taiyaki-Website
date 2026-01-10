import React from "react";
import Navbar from "../components/NavBar";
import App from './../App';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './../components/Footer';
import axios from "axios";
import { apiGet, buildApiUrl } from "../utils/apiClient";
import { useToast } from "../context/toastContext";


const Home = () => {
  const api = import.meta.env.VITE_API_URL;
  const [menu, setMenu] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    if (api) {
      axios.get(buildApiUrl(api, '/api/guest/init'))
        .then (res => localStorage.setItem('guestId', res.data.guestId))
        .catch(() => {/* ignore guest init errors here */});
    }
  },[api])

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!api) {
        setError('Missing VITE_API_URL. Please set the API base URL in your environment.');
        return;
      }
      const res = await apiGet(buildApiUrl(api, '/api/menu'));
      const items = Array.isArray(res.data) ? res.data : [];
      setMenu(items);

      // Prefer items explicitly marked featured via category
      let featured = items.filter(i => (i.category || '').toLowerCase().includes('featured'));
      // Fallback: pick first 4 with images
      if (featured.length === 0) {
        featured = items.filter(i => !!i.imageUrl).slice(0, 4);
      }
      setFeaturedItems(featured);
    } catch (err) {
      console.error('Error fetching featured items:', err);
      if (err.code === 'ECONNABORTED' || (err.message || '').includes('timeout')) {
        setError('The server is waking up (Render cold start). Please try again.');
        showToast('Server waking up, please retry', 'info');
      } else if ((err.message || '').includes('Network Error')) {
        setError('Network error. Please check your connection and retry.');
        showToast('Network error. Check your connection.', 'error');
      } else {
        setError('Failed to load featured products. Please try again later.');
        showToast('Failed to load featured products', 'error');
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    fetchFeatured();
  };
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

      {/* Product Cards with states */}
      {loading ? (
        <div className="flex flex-wrap justify-center gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="rounded-xl overflow-hidden shadow-xl border-t-4 border-gray-700 max-w-xs animate-pulse">
              <div className="w-full h-[400px] bg-gray-800" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition inline-flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
        </div>
      ) : featuredItems.length === 0 ? (
        <div className="text-gray-300">No featured products available right now.</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={item._id || index}
              className="rounded-xl overflow-hidden shadow-xl border-t-4 border-red-600 max-w-xs transition hover:scale-105 duration-300"
              data-aos="zoom-in" data-aos-delay={`${(index+1) * 300}`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover h-[400px]"
              />
            </div>
          ))}
        </div>
      )}

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
