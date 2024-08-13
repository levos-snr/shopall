import React from "react";
import ProductCard from "./ProductCard";
import FetchProducts from "../lib/FetchProducts";
import { Button } from "../components/ui/button";

const Products = () => {
  const { products, loading } = FetchProducts();

  // Check if products is an array before slicing
  const slicedProducts = Array.isArray(products) ? products.slice(0, 8) : [];

  if (loading) {
    return <h1 className="text-center text-xl font-semibold">Loading...</h1>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <Button className="text-3xl font-bold mb-6 border-2 border-red-200 rounded-full">
        PRODUCTS
      </Button>
      <Button className="text-3xl font-bold mb-6 rounded-full m-2 bg-[#77794E] border-2 border-red-200 hover:bg-[#877956] ">
        WHATS TRENDING
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  p-6">
        {slicedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
