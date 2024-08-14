import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Product = () => {
  const data = useLocation().state;

  return (
    <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img
          src={data.images[0]}
          alt={data.title}
          className="w-full h-64 md:h-auto object-cover rounded-lg"
        />
      </div>

      {/* Details Section */}
      <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
        {/* Breadcrumb */}
        <Link to={"/"} className="text-blue-600 text-sm mb-4 inline-block">
          ← Back to Home
        </Link>

        {/* Product Title */}
        <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 text-lg">⭐</span>
          <span className="ml-2 text-sm text-gray-600">
            {data.rating} ({data.reviews.length} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4">{data.description}</p>

        {/* Select Options */}
        <div className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Quantity
            </label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>Basic</option>
              <option>Premium</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <span className="inline-block h-6 w-6 rounded-full bg-pink-500"></span>
              <span className="inline-block h-6 w-6 rounded-full bg-blue-500"></span>
              <span className="inline-block h-6 w-6 rounded-full bg-green-500"></span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-gray-900">
              Ksh. {data.price}
            </span>
            <Button className=" px-4 py-2 rounded-lg">Add to Cart</Button>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800">What's Inside</h4>
          <p className="text-gray-600 mt-2">
            Dimensions: {data.dimensions.width} x {data.dimensions.height} x{" "}
            {data.dimensions.depth} inches
          </p>
          <p className="text-gray-600 mt-2">Weight: {data.weight} kg</p>
          <p className="text-gray-600 mt-2">Brand: {data.brand}</p>
          <p className="text-gray-600 mt-2">SKU: {data.sku}</p>
          <p className="text-gray-600 mt-2">Barcode: {data.meta.barcode}</p>
          <p className="text-gray-600 mt-2">
            Availability: {data.availabilityStatus}
          </p>
          <p className="text-gray-600 mt-2">
            Shipping Information: {data.shippingInformation}
          </p>
          <p className="text-gray-600 mt-2">
            Warranty: {data.warrantyInformation}
          </p>
          <p className="text-gray-600 mt-2">
            Return Policy: {data.returnPolicy}
          </p>
        </div>

        {/* QR Code */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800">QR Code</h4>
          <img
            src={data.meta.qrCode}
            alt="QR Code"
            className="w-24 h-24 mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
