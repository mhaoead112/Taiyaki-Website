import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Navbar from './components/NavBar';
import Menu from './pages/menu.jsx';
import Home from './pages/home.jsx';
import Cart from './pages/cart.jsx';
import About from './pages/about.jsx';
import Branches from './pages/branches.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Checkout from './pages/checkout.jsx';
import PaymentSuccess from './pages/success.jsx';
import PaymentFailed from './pages/failure.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route index element= {<Home />} />
      <Route path='menu' element= {<Menu />} />
      <Route path='branches' element= {<Branches />} />
      <Route path='cart' element= {<Cart />} />
      <Route path='about' element= {<About />} />
      <Route path='checkout' element= {<Checkout />} />
      <Route path='/payment/success' element = {<PaymentSuccess />} />
      <Route path='/payment/faliure' element = {<PaymentFailed />} />

    </Routes>
    </BrowserRouter>
        </CartProvider>
  </React.StrictMode>
);
