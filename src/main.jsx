import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./Routes";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

const routers = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={routers} />
    </CartProvider>
  </React.StrictMode>,
);
