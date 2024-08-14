import React from 'react';
import FetchProducts from '../lib/FetchProducts';

const NewProducts = () => {
  const { products, loading } = FetchProducts();

  if (loading) return <div>Loading...</div>;

  const newProducts = products.slice(0, 12);

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">New Products</h3>
      <div className="grid grid-cols-4 gap-4">
        {newProducts.map(product => (
          <div key={product.id} className="product-card p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
            <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
            <p className="text-red-500 text-lg font-bold">Ksh. {product.price}</p>
            <div className="text-yellow-500">★★★★★</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewProducts;