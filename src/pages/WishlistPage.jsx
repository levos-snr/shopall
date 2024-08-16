import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  // Calculate total price of items in the wishlist
  const totalAmount = wishlist.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">My Wishlist</h1>

      {/* Total Items in Wishlist */}
      <div className="flex items-center justify-between bg-primary text-white p-4 rounded-lg shadow-md mb-6">
        <div>
          <p className="text-lg">
       
           
          </p>
          <p className="text-lg">
            Total Cash Amount:{" "}
            <span className="font-bold">
              ${totalAmount.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="bg-white text-primary font-bold rounded-full px-4 py-1">
          Total Item{wishlist.length === 1 ? "" : "s"} : {wishlist.length}
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg mt-10">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
