import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import ProductTestimonials from "./components/ProductTestimonials";
import OurServices from "./components/OurServices";
import SummerDiscount from "./components/SummerDiscount";
import FashionArticles from "./components/FashionArticles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  return (
    <>
      <div className="container flex flex-col min-h-screen">
        <header className="flex-shrink-0">
                <Navbar />
              </header>
                <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default App;
