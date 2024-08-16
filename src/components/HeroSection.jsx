import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import FetchProducts from '../lib/FetchProducts';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; // Import toast

const HeroSection = () => {
  const { products, loading } = FetchProducts();
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalProducts = products.length;
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalProducts - 1 : prevIndex - 1
    );
  };

  const currentProduct = products[currentIndex];

  const handleAddToCart = () => {
    addToCart(currentProduct);
    toast.success(`${currentProduct.title} has been added to your cart!`); // Add toast notification
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] bg-white dark:bg-gray-900 py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8">
      <div className="relative w-full max-w-4xl text-center">
        {/* Product Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500">
          {currentProduct.title}
        </h1>

        <div className="relative flex items-center justify-center">
          {/* ChevronLeft Button */}
          <Button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 p-2 sm:p-4 rounded-full shadow-lg dark:hover:bg-gray-700 transform -translate-y-1/2"
          >
            <ChevronLeft className="h-8 w-8 sm:h-12 sm:w-12" />
          </Button>

          {/* Product Image */}
          <img
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto object-contain z-10"
          />

          {/* ChevronRight Button */}
          <Button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 p-2 sm:p-4 rounded-full shadow-lg dark:hover:bg-gray-700 transform -translate-y-1/2"
          >
            <ChevronRight className="h-8 w-8 sm:h-12 sm:w-12" />
          </Button>
        </div>

        <div className="mt-6 flex flex-col items-center space-y-4 sm:space-y-6">
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
              Overview
            </span>
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
              Tech specs
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 sm:space-x-4">
            {products.map((_, index) => (
              <span
                key={index}
                className={`w-2.5 h-2.5 sm:w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              ></span>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-bold dark:text-gray-300">
              Total Ksh. {currentProduct.price}
            </p>
            <Button
              className="bg-black text-white px-6 py-3 font-bold rounded-full shadow-lg hover:bg-gray-800"
              onClick={handleAddToCart} // Update onClick handler
            >
              Add to basket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
