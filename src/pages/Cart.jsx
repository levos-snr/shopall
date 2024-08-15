import React, { useState,useEffect } from 'react';
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
    toast.success('Purchase confirmation modal opened');
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
    };


    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    

  
    setCart([]); 

    // Redirect to Order Tracking page
    window.location.href = "/orders";
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
        </ul>
      )}
      <div className="mt-4 text-xl font-bold">Total: Ksh. {totalAmount}</div>

      {cart.length > 0 && (
        <Button onClick={handlePurchaseClick} className="mt-4 bg-blue-500 text-white p-2 rounded">
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
  );
};

export default Cart;
