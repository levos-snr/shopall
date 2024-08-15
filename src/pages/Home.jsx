import FashionArticles from "../components/FashionArticles";
import HeroSection from "../components/HeroSection";
import OurServices from "../components/OurServices";
import Products from "../components/Products";
import ProductTestimonials from "../components/ProductTestimonials";
import SummerDiscount from "../components/SummerDiscount";
import FetchProducts from "../lib/FetchProducts";

const Home = () => {
  const { products } = FetchProducts();

  //  all reviews from all products into one array and slice to show only 3 reviews
  const allReviews = products.flatMap((product) => product.reviews);
  const slicedReviews = allReviews.slice(0, 3);
  return (
    <div className="container mx-auto p-6">
      <HeroSection />
      <Products />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 ">
        <ProductTestimonials reviews={slicedReviews} />
        <SummerDiscount />
        <OurServices />
      </div>
      <FashionArticles />
    </div>
  );
};

export default Home;
