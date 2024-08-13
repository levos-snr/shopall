import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import ProductTestimonials from "./components/ProductTestimonials";
import OurServices from "./components/OurServices";
import SummerDiscount from "./components/SummerDiscount";
import FashionArticles from "./components/FashionArticles"; 
import FetchProducts from "./lib/FetchProducts";

const App = () => {
  const { products } = FetchProducts();

  // Combine all reviews from all products into one array and slice to show only 3 reviews
  const allReviews = products.flatMap(product => product.reviews);
  const slicedReviews = allReviews.slice(0, 3);

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <HeroSection />
      <Products />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 ">
        <ProductTestimonials reviews={slicedReviews} />
        <SummerDiscount />
        <OurServices />
      </div>
      <FashionArticles />
      <Footer />
    </div>
  );
};

export default App;
