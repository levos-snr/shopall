import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import FetchProducts from "../lib/FetchProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { products, loading } = FetchProducts();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [stockFilter, setStockFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    const matchesStock =
      stockFilter === "in-stock"
        ? product.stock > 0
        : stockFilter === "out-of-stock"
        ? product.stock < 7
        : true;

    const matchesCategory =
      categoryFilter === "" ? true : product.category === categoryFilter;

    const matchesSearch =
      debouncedSearchTerm === ""
        ? true
        : product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    return matchesStock && matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 w-full md:pr-6 mb-6 md:mb-0">
          {/* Filters */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="md:w-3/4 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full md:max-w-xs py-2 px-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="ml-2 text-gray-500" />
            </div>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="default">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
