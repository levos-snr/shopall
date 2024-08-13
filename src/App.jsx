import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <>
      <div className="container mx-auto p-6">
        <Navbar />
        <HeroSection />
        <Products />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default App;
