import FetchProducts from "../lib/FetchProducts";

const Product = () => {
  const { product } = FetchProducts();
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full">
          {product.category}
        </div>
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
}

export default Product;