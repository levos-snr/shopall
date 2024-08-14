import React from "react";
import FetchProducts from "../lib/FetchProducts";

const BestSellers = () => {
  const { products, loading } = FetchProducts();

  if (loading) return <div>Loading...</div>;

  const bestSellers = products.slice(0, 6);

  return (
    <div className="p-4 mt-6 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Best Sellers</h3>
      <ul className="space-y-4">
        {bestSellers.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h4 className="text-sm font-semibold">{product.title}</h4>
              <p className="text-sm text-gray-500">Ksh. {product.price}</p>
              <div className="text-yellow-500">★★★★★</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellers;
