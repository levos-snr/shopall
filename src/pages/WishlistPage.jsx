import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
