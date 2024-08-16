import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem("users"));
    if (loggedUser) {
      setUser(loggedUser);
      axios
        .get(`http://localhost:3001/users/${loggedUser.id}`)
        .then((response) => setCart(response.data.cart || []))
        .catch((error) => console.error("Failed to fetch user data", error));
    } else {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .patch(`http://localhost:3001/users/${user.id}`, { cart })
        .then((response) =>
          console.log("Cart saved successfully", response.data),
        )
        .catch((error) => console.error("Failed to save cart", error));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
