import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PurchaseConfirmationModal from '../components/PurchaseConfirmationModal';
import { toast } from "react-toastify";

const ConfirmPayment = () => {
  const { cart, totalAmount, setCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("User details are missing.");
      return;
    }
  
    const order = {
      id: Date.now(),
      items: cart,
      userDetails: user,
      deliveryDate: getExpectedDeliveryDate(),
    };
  
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    // Clear cart
    console.log('Clearing cart...');
    setCart([]); 
  
    toast.success("Order placed successfully!");
    window.location.href = "/orders";
  };

  
  const getExpectedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // Delivery in 5 days
    return deliveryDate.toDateString();
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded">
        Proceed to Payment
      </button>

      {showModal && (
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

export default ConfirmPayment;
