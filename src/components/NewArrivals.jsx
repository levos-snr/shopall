import React from 'react';
import FetchProducts from '../lib/FetchProducts';

const NewArrivals = () => {
  const { products, loading } = FetchProducts();

  if (loading) return <div>Loading...</div>;

  const newArrivals = products.slice(0, 6); 

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">New Arrivals</h3>
      <div className="space-y-4">
        {newArrivals.map(product => (
          <div key={product.id} className="flex items-center space-x-4">
            <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded" />
            <div>
              <h4 className="text-sm font-semibold">{product.title}</h4>
              <p className="text-sm text-gray-500">Ksh. {product.price}</p>
              <div className="text-yellow-500">★★★★★</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;