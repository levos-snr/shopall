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

const App = () => {
  return (
    <div className="container mx-auto p-6">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
