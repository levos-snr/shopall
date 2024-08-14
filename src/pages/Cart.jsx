import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateQuantity(id, quantity);
    } else {
      // Minimum quantity is 1
      updateQuantity(id, 1); 
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-4 p-4 border rounded">
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">Price: Ksh. {item.price}</p>
                <p className="text-gray-600">
                  Quantity: 
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="ml-2 border p-1 rounded"
                  />
                </p>
              </div>
              <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
            </li>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: Ksh. {totalAmount}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Cart;
