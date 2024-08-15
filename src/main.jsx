import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext"; // Import WishlistProvider

const routers = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={routers} />
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>,
);
