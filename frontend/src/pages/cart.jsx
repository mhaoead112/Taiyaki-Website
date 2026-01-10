import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import React from 'react'
import { useToast } from '../context/toastContext';
import Navbar from '../components/NavBar';
import axios from 'axios';
import { buildApiUrl } from '../utils/apiClient';
const Cart = () => {
  const api = import.meta.env.VITE_API_URL;
  const { showToast } = useToast();

  const navigate = useNavigate();
  const [cart , setCart] = useState({ items: [] });
  const [userId , setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  // Ensure we have a stable guestId before fetching cart
  useEffect(() => {
    const ensureGuestId = async () => {
      const existing = localStorage.getItem('guestId');
      if (existing) {
        setUserId(existing);
        return;
      }
      if (!api) return;
      try {
        const res = await axios.get(buildApiUrl(api, '/api/guest/init'));
        const gid = res.data?.guestId;
        if (gid) {
          localStorage.setItem('guestId', gid);
          setUserId(gid);
        }
      } catch (e) {
        // ignore init failures; user can retry later
      }
    };
    ensureGuestId();
  }, [api]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!api || !userId) return;
        setLoading(true);
        setError(null);
        // Fetch fees alongside cart
        try {
          const feesRes = await axios.get(buildApiUrl(api, '/api/cart/fees'));
          setFees({
            vatPercent: Number(feesRes.data?.vatPercent ?? 14),
            deliveryFee: Number(feesRes.data?.deliveryFee ?? 20),
          });
        } catch {}
        const res = await axios.get(buildApiUrl(api, `/api/cart/${userId}`));
        setCart(res.data || { items: [] });
      } catch (err) {
        console.error('Failed to load cart', err);
        setError('Unable to load your cart right now. Please try again.');
        showToast('Failed to load cart', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
   }, [api, userId] );
    // useEffect((item)=> {
    //   axios.post('${api}/cart/update-quantity')
    // },[cart])
  // setProducts(cart);
  // Update quantity for item
  const updateQuantity = async (menuItemId, newQuantity) => {
  try {
    if (!api || !userId) return;
    setUpdatingItemId(menuItemId);
    const res = await axios.patch(buildApiUrl(api, `/api/cart/update-quantity`), {userId, menuItemId, quantity: newQuantity  })
    // Set immediate response, then refetch for consistency
    setCart(res.data || { items: [] });
    try {
      const refreshed = await axios.get(buildApiUrl(api, `/api/cart/${userId}`));
      setCart(refreshed.data || { items: [] });
    } catch {}
    showToast(newQuantity < 1 ? 'Item removed' : 'Cart updated', 'success', 2000);
  } catch (err) {
    console.error('Error updating quantity', err);
    showToast('Failed to update cart', 'error');
  } finally {
    setUpdatingItemId(null);
  }
};
  const subtotal = (cart?.items || []).reduce((acc, item) => {
    const unitPrice = Number(item?.menuItemId?.price ?? 0);
    const extrasTotal = (item?.extras || []).reduce((s, e) => s + Number(e?.price ?? 0), 0);
    const qty = Number(item?.quantity ?? 0);
    return acc + (unitPrice + extrasTotal) * qty;
  }, 0);
  const [fees, setFees] = useState({ vatPercent: 14, deliveryFee: 20 });
  const vatAmount = subtotal * (fees.vatPercent / 100);
  const discount = 0;
  const total = subtotal + vatAmount + fees.deliveryFee - discount;

    return (
    <>
    <Navbar />
    <motion.div
      className="min-h-screen bg-black text-white p-6 flex flex-col md:flex-row gap-8 items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cart Products */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 animate-pulse">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-gray-800 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-800 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (cart?.items?.length || 0) === 0 ? (
          <div className="text-center text-gray-300">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/menu" className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Browse Menu</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.menuItemId._id} className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.menuItemId.imageUrl} alt={item.menuItemId.title} loading="lazy" className="w-14 h-14 rounded-xl" />
                  <div>
                    <p className="font-semibold">{item.menuItemId.title}</p>
                    <p className="text-sm text-gray-400">{item.menuItemId.price} EGP</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <button
                    onClick={() => updateQuantity(item.menuItemId._id, item.quantity - 1)}
                    className="px-2 hover:text-red-400"
                    disabled={item.quantity <= 1 || updatingItemId === item.menuItemId._id}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.menuItemId._id, item.quantity + 1)}
                    className="px-2 hover:text-green-400"
                    disabled={updatingItemId === item.menuItemId._id}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <p>{(((item?.menuItemId?.price ?? 0) + (item?.extras || []).reduce((s, e) => s + Number(e?.price ?? 0), 0)) * (item?.quantity ?? 0)).toFixed(2)} EGP</p>
                  <button
                    onClick={() => updateQuantity(item.menuItemId._id, 0)}
                    className="text-sm text-red-500 hover:text-red-400"
                    disabled={updatingItemId === item.menuItemId._id}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 w-full max-w-sm space-y-6">
        {/* Coupon */}
        <div>
          <h3 className="font-semibold text-lg">Coupon Code</h3>
          <p className="text-sm text-gray-400 mb-2">Enter your promo code</p>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl border-none bg-white/10 placeholder-gray-400 text-white"
            placeholder="Coupon code"
          />
          <button className="mt-2 w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-xl shadow-md">
            Apply
          </button>
        </div>

        {/* Cart Totals */}
        <div className="bg-white/10 p-4 rounded-xl">
          <h4 className="font-bold mb-4">Cart Total</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Cart Subtotal</span>
              <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>VAT ({fees.vatPercent}%)</span>
              <span>{vatAmount.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{discount.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{fees.deliveryFee.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between font-bold text-white border-t border-white/10 pt-2">
              <span>Total</span>
              <span>{total.toFixed(2)} EGP</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => navigate('/checkout')}
          disabled={loading || (cart?.items?.length || 0) === 0}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition shadow-xl disabled:opacity-50"
        >
          Go to Payment
        </button>

        <button
          onClick={async () => {
            try {
              if (!api || !userId) return;
              await axios.delete(buildApiUrl(api, `/api/cart/${userId}`));
              setCart({ items: [] });
              showToast('Cart cleared', 'success');
            } catch (e) {
              showToast('Failed to clear cart', 'error');
            }
          }}
          disabled={loading || (cart?.items?.length || 0) === 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition shadow-xl disabled:opacity-50"
        >
          Clear Cart
        </button>
      </div>
    </motion.div>

    </>
  );
};

export default Cart;
