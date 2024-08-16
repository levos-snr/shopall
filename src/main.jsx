import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { NotificationProvider } from './context/NotificationContext';

const routers = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <NotificationProvider>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={routers} />
      </WishlistProvider>
    </CartProvider>
    </NotificationProvider>
  </React.StrictMode>,
);
