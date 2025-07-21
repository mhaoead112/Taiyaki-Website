// src/app/root.jsx
import React from 'react';
import * as ReactDOM from "react-dom";
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu'
import Cart from './pages/cart';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "menu",
        element: <Menu />,
      },{
        path: "cart",
        element: <Cart />,
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Navbar />
  < Menu />
  <RouterProvider router={router} />
  </>
);