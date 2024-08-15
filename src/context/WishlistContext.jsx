
import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();


import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {

    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  return (

    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
