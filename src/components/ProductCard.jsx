
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react"; 

const ProductCard = ({ product }) => {
  return (
    <div className="relative max-w-sm bg-white rounded-lg shadow-lg overflow-hidden ">
      {/* Discount Badge */}
      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-br-lg z-10">
        {product.discountPercentage}% OFF
      </div>

      {/* Heart Icon */}
      <div className="absolute top-2 right-2 z-10">
        <Button className="text-black  focus:outline-none bg-white hover:bg-white hover:text-red-600">
          <HeartIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Product Image and Add to Cart Button */}
      <div className="relative group">
        <img
          className="w-full h-48 object-cover"
          src={product.thumbnail}
          alt={product.title}
        />
        {/* Add to Cart Button (Visible on Hover) */}
        <Button className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none">
          Add to Cart
        </Button>
      </div>

      <div className="p-6">
        {/* Product Title */}
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>

        {/* Category */}
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>

        {/* Price and Original Price */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            Ksh. {product.price}
          </span>
          <span className="text-sm line-through text-gray-500">
            Ksh.{" "}
            {(product.price / (1 - product.discountPercentage / 100)).toFixed(
              2,
            )}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-4">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviews.length} Reviews)
          </span>
        </div>

        {/* Stock Status */}
        <p className="text-gray-600 mt-2">Stock: {product.stock}</p>

        {/* Tags */}
        <div className="flex flex-wrap mt-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Availability */}
        <p className="text-gray-600 mt-2">
          Availability: {product.availabilityStatus}
        </p>
      </div>
    </div>
  );
};



export default ProductCard;

