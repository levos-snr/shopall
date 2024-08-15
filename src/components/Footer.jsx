import { Facebook, Instagram, Truck } from "lucide-react";
import React from "react";
import { FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left p-10">
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <Truck className="text-bold h-6 h-6" />
            <h4 className="text-white font-bold text-lg">
              FREE AND FAST DELIVERY
            </h4>
            <p className="text-gray-400">
              Free delivery for all orders over Ksh. 140
            </p>
          </div>
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="flex justify-center items-center bg-gray-800 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
            <h4 className="text-white font-bold text-lg">
              24/7 CUSTOMER SERVICE
            </h4>
            <p className="text-gray-400">Friendly 24/7 customer support</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center bg-gray-800 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
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
            <h4 className="text-white font-bold text-lg">
              MONEY BACK GUARANTEE
            </h4>
            <p className="text-gray-400">We return money within 30 days</p>
          </div>
        </div>

        <div className="bg-gray-900 text-gray-300 p-10">
          {/* Middle Section with Address and Contact Info */}
          <div className="border-t border-gray-700 pt-8 md:flex justify-between">
            <div className="mb-8 md:mb-0">
              <p className="text-white">Address:</p>
              <p>Nairobi, Kenya</p>
              <p className="text-white mt-4">Contact:</p>
              <p>+254 70505628</p>
              <p>test@gmail.com</p>

              {/* Social Icons */}
              <div className="flex space-x-4 mb-8 md:mb-0 justify-center">
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Bottom Section with Links */}
            <div className="pt-8 flex flex-col md:flex-row justify-between">
              <div className="flex justify-center space-x-8 mt-8 md:mt-0 text-gray-400">
                <div className="flex flex-col">
                  <a href="#" className="hover:text-white">
                    {" "}
                    <Instagram />
                  </a>
                  <a href="#" className="hover:text-white">
                    {" "}
                    <Facebook />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaTiktok />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaTwitter />
                  </a>
                  <a href="#" className="hover:text-white">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex border-t border-gray-700 pt-8 text-gray-400 text-center md:text-left w-full justify-center mt-8">
            <p>&copy; 2024 Shopall. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
