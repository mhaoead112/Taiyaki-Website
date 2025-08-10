import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/NavBar";
// import { clearCart } from "../redux/cartSlice"; // Assuming you have a clearCart action
 import '../App.css';
import PaymentMethodSelect from "../components/PayementMethodSelect";
import { useNavigate } from "react-router";

const Checkout = () => {
const api = import.meta.env.VITE_API_URL;
      let navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [errorPay, setErrorPay] = useState("");

  const [total ,setTotal]= useState(0);
  
  const [cartItems , setCartItems] = useState({ items: [] });
  const [userId , setUserId] = useState(localStorage.getItem('guestId'));
  const subtotal = 50;
  const vat = 100;
  const delivery = 20;
  useEffect(() => {
  setUserId(localStorage.getItem('guestId'))
  },[])
   useEffect(() => {
    
      axios.get(`${api}/api/cart/${userId}`).then(res => setCartItems(res.data));
    }, [userId] );
    useEffect(()=> {
              setTotal(cartItems.items.reduce((sum, item) => sum + item.menuItemId.price * item.quantity, 0))
    },[cartItems])
 const [form, setForm] = useState({
    phone: '',
    phone2: '',
    name: '',
    email: '',
    address: '',
    branch: '',
    building: '',
    floor: '',
    apartment: '',
    notes: '',
    payment:paymentMethod
  });

//   const dispatch = useDispatch();

  const handleChange = (e) => {
    form.payment = paymentMethod;
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form.payment);
    
  };

  const handleOrder = async (e) => {
    const {address , building , floor , apartement} = form
    const adressArray = [address , building , floor , apartement];
    const joinedArray = adressArray.join("-");
    try {
    form.payment = paymentMethod;

        e.preventDefault();
    // Check for empty fields
    if(form.payment == "") {
        setErrorPay("Please Select a payement method");
        return;
    }
    else {
    setErrorPay("");
    }
    for (const field in form) {
            
      if (!form[field]) {
        console.log(`Fill ${field}`)
        if(field === 'notes' || field ==='phone2'){
            setError("")
            console.log(error)
            continue;
        }
        setError("Please fill out all fields");
        return;
      }
    }

    setError("");
    setErrorPay("");
    if(form.payment ==="credit_card") {
        const response = await axios.post(`${api}/api/paymob/checkout` , {
            amount: (total*100),
        }).then((res)=> {
            window.location.href = res.data.redirectUrl
        })  
    }
      const response = await axios.post(`${api}/api/order`, {
        name: form.name,
        phone: form.phone,
        address: joinedArray,
        branch: form.branch,
        items: cartItems.items,
        totalPrice: total,
      }).then((data)=> {
        localStorage.setItem('orderId' , data.data.order._id )      });
      
      alert("Order placed successfully!");
    //   dispatch(clearCart());
    } catch (error) {
      alert("Order failed.");
      console.error(error);
    }
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-8">
          {/* Contact Info */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Contact Info</h2>
                  {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="phone" onChange={handleChange} placeholder="Phone number" className="input" />
              <input name="phone2" onChange={handleChange} placeholder="Second phone (optional)" className="input" />
              <input name="name" onChange={handleChange} placeholder="Full name" className="input" />
              <input name="email" onChange={handleChange} placeholder="Email" className="input" />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Address</h2>
                              {error && <p className="text-red-500 mb-3">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="address" onChange={handleChange} placeholder="Address" className="input col-span-2 required:border-red-500" />
              <select name="branch" onChange={handleChange} className="input">
                <option value="Mall of Arabia">Mall of Arabia</option>
                <option value="Mall of Egypt">Mall of Egypt</option>
              </select>
              <input name="building" onChange={handleChange} placeholder="Building name/number" className="input" />
              <input name="floor" onChange={handleChange} placeholder="Floor" className="input" />
              <input name="apartment" onChange={handleChange} placeholder="Apartment" className="input" />
              <textarea name="notes" onChange={handleChange} placeholder="Extra details" className="input col-span-2"></textarea>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 space-y-6">
                                      {errorPay && <p className="text-red-500 mb-3">{errorPay}</p>}

          <PaymentMethodSelect selected={paymentMethod} onChange={setPaymentMethod} />

          {/* Summary Totals */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>{subtotal.toFixed(2)} EGP</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{delivery.toFixed(2)} EGP</span></div>
              <div className="flex justify-between"><span>VAT</span><span>{vat.toFixed(2)} EGP</span></div>
              <hr className="my-2 border-white/10" />
              <div className="flex justify-between font-bold text-white"><span>Total</span><span>{total.toFixed(2)} EGP</span></div>
            </div>
          </div>

          <button onClick={handleOrder} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg transition">
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
}
export default Checkout;