import React from "react";

const SummerDiscount = () => {
  return (
    <div
      className="flex justify-center items-center p-8 rounded-lg shadow-lg text-center bg-cover bg-center"
      style={{ backgroundImage: 'url(http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSkgI-e-c-1Jks8Bm6-pFZK6-iUQIFDh3x-9SwNai69VttYQ08r1gE5us3cjZyvOSOJ0cnlBoauVCxZRaI2EOU)' }}
    >
      <div className="bg-pink-100 bg-opacity-70 p-8 rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Summer Collection</h2>
        <p className="text-xl text-gray-600 mb-4">Starting @ Ksh. 1,000</p>
        <div className="bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full">
          25% Discount
        </div>
        <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default SummerDiscount;
