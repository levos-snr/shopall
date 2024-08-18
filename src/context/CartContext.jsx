import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
      console.log("Cart loaded from localStorage:", savedCart);
    }

    // Load user from session storage
    const loggedUser = JSON.parse(sessionStorage.getItem("users"));
    if (loggedUser) {
      setUser(loggedUser);
      // Optionally fetch user-specific cart if available
      axios
        .get(`https://json-server-vercel-8mwp.vercel.app/users/${loggedUser.id}`)
        .then((response) => {
          const serverCart = response.data.cart || [];
          if (serverCart.length > 0) {
            setCart(serverCart); // Only overwrite local cart if server cart is not empty
            console.log("Cart loaded from server:", serverCart);
          }
        })
        .catch((error) => console.error("Failed to fetch user data", error));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      console.log("Saving cart to localStorage:", cart); // Debugging log
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    } else {
      localStorage.removeItem("cart"); // Remove cart from localStorage if empty
    }

    if (user) {
      axios
        .patch(`https://json-server-vercel-8mwp.vercel.app/users/${user.id}`, { cart })
        .then((response) => console.log("Cart saved to server successfully", response.data))
        .catch((error) => console.error("Failed to save cart", error));
    }
  }, [cart, user]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    console.log("Item added to cart:", item);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart)); // Sync localStorage with state
      return newCart;
    });
    console.log("Item removed from cart:", id); // Debugging log
    toast.error("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        totalAmount,
        setCart,
        setUser,
        user
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
