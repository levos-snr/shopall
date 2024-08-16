import React from 'react';
import { Button } from '../components/ui/button';

const PurchaseConfirmationModal = ({ cart, totalAmount, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
        <div className="mb-4">
          <p><strong>Total Amount:</strong> Ksh. {totalAmount}</p>
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.title}</span>
                <span>Ksh. {item.price} x {item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose} className="bg-gray-500 text-white mr-2">Cancel</Button>
          <Button onClick={onConfirm} className="bg-blue-500 text-white">Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
