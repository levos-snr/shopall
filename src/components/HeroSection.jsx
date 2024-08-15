import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import FetchProducts from '../lib/FetchProducts';
import { useCart } from '../context/CartContext';

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

  return (
    <div className="relative flex flex-col items-center justify-center h-[75vh] bg-white dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-6xl text-center">
        <div className="relative">
          <h1 className="absolute inset-0 flex items-center justify-center text-[7rem] font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {currentProduct.title}
          </h1>
          <img
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            className="mx-auto h-[400px] object-contain relative z-10"
          />
        </div>

        <div className="mt-8 flex items-center justify-between space-x-4">
          <Button onClick={handlePrev} className="p-4 rounded-full shadow-lg dark:hover:bg-gray-700">
            <ChevronLeft className="h-12 w-12" />
          </Button>
          <Button onClick={handleNext} className="p-4 rounded-full shadow-lg dark:hover:bg-gray-700">
            <ChevronRight className="h-12 w-12" />
          </Button>
        </div>

        <div className="flex w-full items-center justify-around">
          <div className="flex justify-center mt-6 space-x-8">
            <span className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
              Overview
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
              Tech specs
            </span>
          </div>

          <div className="mt-6 flex justify-center space-x-2">
            {products.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              ></span>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center space-y-4">
            <p className="text-2xl text-gray-700 font-bold dark:text-gray-300">
              Total Ksh. {currentProduct.price}
            </p>
            <Button
              className="bg-black text-white p-7 font-bold rounded-full shadow-lg hover:bg-gray-800"
              onClick={() => addToCart(currentProduct)}
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
