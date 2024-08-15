import { Facebook, Instagram, Truck } from "lucide-react";
import React from "react";
import { FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16 w-full">
      {/* Full-width white background section */}
      <div className="bg-white w-full">
        <div className="container mx-auto px-4 max-w-5xl py-16">
          {/* First part of the footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex flex-col items-center mb-8 md:mb-0 transition transform hover:scale-105">
              <Truck className="h-10 w-10 mb-4 text-yellow-500" />
              <h4 className="font-bold text-xl text-gray-900">
                FREE AND FAST DELIVERY
              </h4>
              <p className="text-gray-600">
                Free delivery for all orders over Ksh. 140
              </p>
            </div>
            <div className="flex flex-col items-center mb-8 md:mb-0 transition transform hover:scale-105">
              <div className="flex justify-center items-center bg-gray-800 p-6 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-4.215A2.32 2.32 0 0016.5 11.5H5.5a2.32 2.32 0 00-2.095 1.285L2 17h5m0 0V7a5 5 0 0110 0v10z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-gray-900">
                24/7 CUSTOMER SERVICE
              </h4>
              <p className="text-gray-600">Friendly 24/7 customer support</p>
            </div>
            <div className="flex flex-col items-center transition transform hover:scale-105">
              <div className="flex justify-center items-center bg-gray-800 p-6 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 10c0 1.38-.56 2.63-1.47 3.53l-1.06 1.06a1.992 1.992 0 01-2.83 0L8 11.41V10m3.59-4.59L11 8.59 9.41 10H8m8-5a3.5 3.5 0 00-7 0h7z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-gray-900">
                MONEY BACK GUARANTEE
              </h4>
              <p className="text-gray-600">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-gray-300 container mx-auto px-4 max-w-5xl p-4">
        {/* Middle Section with Address and Contact Info */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <p className="text-white text-lg">Address:</p>
            <p className="mb-4">Nairobi, Kenya</p>
            <p className="text-white text-lg mt-4">Contact:</p>
            <p>+254 70505628</p>
            <p>test@gmail.com</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-8 md:mt-0">
            <a href="#" className="text-white hover:text-gray-400">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTiktok size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Newsletter and Embedded Map (Optional Additions) */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <h4 className="text-xl font-bold">Join Our Newsletter</h4>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md focus:outline-none w-2/3"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white p-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-8 mt-8  text-center text-gray-400">
          <p>&copy; 2024 Shopall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
