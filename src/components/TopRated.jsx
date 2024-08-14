import React from 'react';
import FetchProducts from '../lib/FetchProducts';

const TopRated = () => {
  const { products, loading } = FetchProducts();

  if (loading) return <div>Loading...</div>;

  // Sort products by rating in descending order and pick the top 4
  const topRatedProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6); 

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Top Rated</h3>
      <div className="space-y-4">
        {topRatedProducts.map(product => (
          <div key={product.id} className="flex items-center space-x-4">
            <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded" />
            <div>
              <h4 className="text-sm font-semibold">{product.title}</h4>
              <p className="text-sm text-gray-500">Ksh. {product.price}</p>
              <div className="text-yellow-500">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRated;
