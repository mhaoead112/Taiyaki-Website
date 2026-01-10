import { useState ,useEffect } from "react"
import React  from 'react'
import { Plus, AlertCircle, RefreshCw } from 'lucide-react';
 import '../App.css';
import Navbar from "../components/NavBar";
import MenuItemModal from "../components/MenuItemModal";
import Footer from './../components/Footer';
import axios from "axios";
import { apiGet } from "../utils/apiClient";

const Menu = () => {
  const api = import.meta.env.VITE_API_URL;

const [menu, setMenu] = useState([]);
const [userId , setUserId] = useState();
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
  setUserId(localStorage.getItem('guestId'))
  },[])

const addToCart = async (menuItemId, extras, quantity) => {
  const bodyObject = {items:  {menuItemId , extras, quantity}};
 await axios.post(`${api}/api/cart/${userId}`, bodyObject);
     window.location.reload(false);
  };

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet(`${api}/api/menu`);
      
      if (res.data && res.data.length > 0) {
        setMenu(res.data);
      } else {
        setError("No menu items available at the moment.");
      }
    } catch (err) {
      console.error("Error fetching menu:", err);
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError("The server is taking longer than expected to respond. This usually happens when the backend is waking up. Please try again.");
      } else if (err.message.includes('Network Error')) {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else {
        setError("Failed to load menu items. Please try again later.");
      }
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  const handleRetry = () => {
    setIsRetrying(true);
    fetchMenu();
  };

// const  {addToCart}  = useCart();
 
  const handleAdd = (item) => {
    console.log(item);
  };
  const [groupedMenu, setGroupedMenu] = useState([]);
useEffect(() => {
  const grouped = menu.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
  setGroupedMenu(grouped);
}, [menu]);
  // const [cart, setCart] = useState([]);


  //     const addToCart = (item) => {
  //   const existing = cart.find((i) => i._id === item._id);  
  //   if (existing) {
  //       console.log(`${existing.qty} ${existing.name} to cart`)
  //       console.log(cart)
  //       setCart(cart.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i));
  //   } else {
        
  //     setCart([...cart, { ...item, qty: 1 }]);
  //     console.log(cart)
  //   }
  // }
    const [selectedItem, setSelectedItem] = useState(null);

  const handleAddToCart = (data) => {
    console.log('Item added to cart:', data)
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="bg-black min-h-screen px-6 py-10 text-white">
      <div className="mb-14">
        <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-black border-l-4 border-gray-700 rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-24 bg-gray-800 rounded mb-4"></div>
              <div className="h-6 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 bg-gray-800 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-800 rounded w-20"></div>
                <div className="h-8 w-8 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="bg-black min-h-screen px-6 py-10 text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        {error.includes('waking up') && (
          <p className="text-sm text-gray-500 mb-6">
            💡 Our server on Render goes to sleep after inactivity. It may take 30-60 seconds to wake up.
          </p>
        )}
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Retrying...' : 'Try Again'}
        </button>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="bg-black min-h-screen px-6 py-10 text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">No Menu Items Available</h2>
        <p className="text-gray-400 mb-6">Our menu is currently empty. Please check back later!</p>
        <button
          onClick={handleRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
        >
          Refresh
        </button>
      </div>
    </div>
  );

    return (
        <>
        <Navbar />
    {loading ? (
      <LoadingSkeleton />
    ) : error ? (
      <ErrorDisplay />
    ) : menu.length === 0 ? (
      <EmptyState />
    ) : (
    <div className="bg-black min-h-screen px-6 py-10 text-white">
      {
      Object.entries(groupedMenu).map(([category, items]) => (
        <div key={category} className="mb-14">
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="text-red-500">{category.split(" ")[0]}</span>{" "}
            {category.split(" ").slice(1).join(" ")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-black border-l-4 border-red-500 rounded-lg shadow-md p-4 hover:shadow-red-500/40 transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-24 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-extrabold">{item.price}EGP</span>
                  <button className="text-white border border-white rounded-full p-1 hover:bg-red-500 transition cursor-pointer" onClick={() => setSelectedItem(item)}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <MenuItemModal
        isOpen={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onConfirm={(itemData) => addToCart(itemData.item._id , itemData.extras , itemData.quantity)}
      />
    </div>
    )}
    <Footer />
        </>
     );
}
export default Menu;