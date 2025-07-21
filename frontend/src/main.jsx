import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Navbar from './components/NavBar';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Cart from './pages/cart';
import About from './pages/about';
import Branches from './pages/branches';
import { CartProvider } from './context/CartContext';
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

    </Routes>
    </BrowserRouter>
        </CartProvider>
  </React.StrictMode>
);
