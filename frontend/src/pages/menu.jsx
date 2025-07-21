import { useState ,useEffect } from "react"
import React  from 'react'
import { Plus } from 'lucide-react';
 import '../App.css';
import Navbar from "../components/NavBar";
import MenuItemModal from "../components/MenuItemModal";
import Footer from './../components/Footer';
import { useCart } from "../context/cartContext";
import axios from "axios";
const Menu = () => {
const [menu, setMenu] = useState([]);
useEffect(() => {
  axios.get('http://localhost:3000/api/menu')
    .then(res => {

      setMenu(res.data);
       console.log(menu);
    })
    .catch(err => console.error(err));
}, []);
const  {addToCartf}  = useCart();

  const handleAdd = (item) => {
    addToCartf(item);
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
  const [cart, setCart] = useState([]);

      const addToCart = (item) => {
    const existing = cart.find((i) => i._id === item._id);  
    if (existing) {
        console.log(`${existing.qty} ${existing.name} to cart`)
        console.log(cart)
        setCart(cart.map(i => i._id === item._id ? { ...i, qty: i.qty + 1 } : i));
    } else {
        
      setCart([...cart, { ...item, qty: 1 }]);
      console.log(cart)
    }
  }
    const [selectedItem, setSelectedItem] = useState(null);

  const handleAddToCart = (data) => {
    console.log('Item added to cart:', data)
  };
    return (
        <>
        <Navbar />
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
        onConfirm={(itemData) => handleAdd(itemData)}
      />
    </div>
    <Footer />
        </>
     );
}
export default Menu;