import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import PurchaseConfirmationModal from '../components/PurchaseConfirmationModal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalAmount, setCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const getExpectedDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 5);
    return deliveryDate.toLocaleDateString();
  };

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    updateQuantity(id, quantity > 0 ? quantity : 1);
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!user) {
      toast.error('Please log in to make a purchase');
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      userDetails: user,
      deliveryDate: getExpectedDeliveryDate(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    setCart([]); 
    // Redirect to Order Tracking page
    window.location.href = '/orders';
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <img

                  src={item.images[0]} 
                  alt={item.title}
                  className="w-full md:w-1/4 h-48 object-cover"
                />
                <div className="p-4 flex flex-col justify-between w-full md:w-3/4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-700 text-lg mb-2">Price: Ksh. {item.price}</p>
                    <p className="text-gray-600 mb-2">Weight: {item.weight} kg</p>
                    <p className={`text-lg ${item.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                      Availability: {item.availabilityStatus}
                    </p>
                    <p className="text-gray-500 text-sm">Created At: {item.meta?.createdAt ? new Date(item.meta.createdAt).toLocaleDateString() : 'N/A'}</p>
                    <p className="text-gray-500 text-sm">Updated At: {item.meta?.updatedAt ? new Date(item.meta.updatedAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <input
                      type="number"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="border p-2 rounded w-24"
                    />
                    <Button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white py-2 px-4 rounded">
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-bold">Total: Ksh. {totalAmount}</div>
          {cart.length > 0 && (
            <Button onClick={handlePurchaseClick} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Purchase
            </Button>
          )}

          {/* Render the PurchaseConfirmationModal */}
          {isModalOpen && (
            <PurchaseConfirmationModal
              cart={cart}
              totalAmount={totalAmount}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
