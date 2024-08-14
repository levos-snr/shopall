import React from 'react';
import FetchProducts from '../lib/FetchProducts';

const SpecialOffers = () => {
  const { products, loading } = FetchProducts();

  if (loading) return <div>Loading...</div>;

  const specialOffers = products.filter(product => product.discountPercentage > 10);

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Deal of The Day</h3>
      {specialOffers.slice(0, 1).map(product => (
        <div key={product.id} className="flex space-x-4">
          <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-cover rounded" />
          <div>
            <h4 className="text-lg font-semibold">{product.title}</h4>
            <p className="text-red-500 text-xl font-bold">Ksh. {product.price}
              <span className="line-through text-gray-500 ml-2">
                Ksh.{" "}
                {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                  2,
                )}
              </span>
            
            </p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecialOffers;