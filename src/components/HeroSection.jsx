import FetchProducts from "../lib/FetchProducts";
import "./HeroSection.css";

const HeroSection = () => {
  const { products, loading } = FetchProducts();
  const picture = products.map((pic) => pic.thumbnail);
  const slicedPic = picture.slice(0, 11);
  return (
    <div className="hero-section">
      <h1></h1>
      <div className="flex">
        {slicedPic.map((p) => (
          <img src={p} alt="product" />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
