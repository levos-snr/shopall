import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PurchaseConfirmationModal from '../components/PurchaseConfirmationModal';
import { useNotifications } from '../context/NotificationContext'; // Import the context

const ConfirmPayment = () => {
  const { cart, totalAmount, setCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { addNotification } = useNotifications(); // Use the context

  const handleConfirm = () => {
    setLoading(true);
    setPaymentSuccess(false);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      addNotification("User details are missing.", "error");
      setLoading(false);
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      userDetails: user,
      deliveryDate: getExpectedDeliveryDate(),
    };

    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      setCart([]);
      localStorage.removeItem("cart");

      setPaymentSuccess(true);
      addNotification("Order placed successfully!", "success");
      setLoading(false);
    }, 2000);
  };

  const getExpectedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);
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
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-xl flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-12 h-12 animate-spin">
              {/* SVG Path */}
            </svg>
            <div className="mt-2">Processing Payment...</div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {paymentSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-xl flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-12 h-12 mb-4">
              {/* SVG Path */}
            </svg>
            <div className="mt-2 text-center">
              <h2 className="text-2xl mb-4">Payment Successful!</h2>
              <p className="text-lg mb-4">Thank you for your purchase.</p>
              <Link to="/orders" className="bg-green-500 text-white py-2 px-4 rounded">
                View Your Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmPayment;
