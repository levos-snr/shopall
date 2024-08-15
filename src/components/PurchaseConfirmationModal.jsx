import React from 'react';
import { Button } from '../components/ui/button';

const PurchaseConfirmationModal = ({ cart, totalAmount, onClose, onConfirm }) => {
  const handleConfirmPurchase = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(); 
    } else {
      console.error("onConfirm is not a function");
    }
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Confirm Your Purchase</h2>
        <ul className="mb-4">
          {cart.map((item) => (
            <li key={item.id} className="mb-2">
              <p>{item.title} - Ksh. {item.price} x {item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="text-lg font-bold mb-4">Total: Ksh. {totalAmount}</div>
        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-gray-300">
            Cancel
          </Button>
          <Button onClick={handleConfirmPurchase} className="bg-green-500">
            Confirm Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
