import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNotifications } from '../context/NotificationContext'; // Import the context

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error('Invalid Date');
    return date.toLocaleDateString(); // or any format you prefer
  } catch {
    return 'Invalid Date';
  }
};

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleMarkAsDone = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Delivered", deliveryDate: new Date().toISOString() } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order marked as done!");
    addNotification("Order marked as done!", "success");
  };

  const handleEditOrder = (orderId, updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, ...updatedOrder } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order updated successfully!");
    addNotification("Order updated successfully!", "success");
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.error("Order canceled successfully!");
    addNotification("Order canceled successfully!", "error");
  };

  const calculateProgress = (status, deliveryDate) => {
    if (status === "Delivered") return 100;

    const deliveryDateObj = new Date(deliveryDate);
    const today = new Date();
    const deliveryDuration = 5;
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(startDate.getDate() + deliveryDuration);

    if (today > deliveryDateObj) return 100;

    const totalDuration = Math.ceil((deliveryDateObj - startDate) / (1000 * 60 * 60 * 24));
    const progress = 100 - Math.ceil((totalDuration / deliveryDuration) * 100);
    return Math.max(0, Math.min(progress, 100));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Order Tracking</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          const progress = calculateProgress(order.status, order.deliveryDate);
          return (
            <div key={order.id} className="bg-white p-4 rounded shadow mb-4">
              <h4 className="text-xl font-semibold">Order #{order.id}</h4>
              <p className="text-gray-600">Expected Delivery: {formatDate(order.deliveryDate)}</p>
              {order.userDetails ? (
                <p className="text-gray-600">
                  Customer: {order.userDetails.username} ({order.userDetails.email})
                </p>
              ) : (
                <p className="text-gray-500">No customer details available.</p>
              )}

              {/* Items List */}
              <h3 className="text-lg font-semibold mt-4">Items</h3>
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center mb-2 border-b pb-2">
                    <div>
                      <h4 className="text-md">{item.title}</h4>
                      <p className="text-gray-500">Price: Ksh. {item.price}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">Ksh. {item.price * item.quantity}</p>
                  </li>
                ))}
              </ul>

              {/* Progress Bar */}
              <h3 className="text-lg font-semibold mt-4">Order Status</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-teal-600 bg-teal-200">
                    {progress}% Progress
                  </span>
                </div>
                <div className="flex h-2 overflow-hidden rounded bg-teal-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="flex flex-col justify-center text-center text-xs text-white bg-teal-500"
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 ">
                {order.status !== "Delivered" && (
                  <button
                    onClick={() => handleMarkAsDone(order.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Mark as Done
                  </button>
                )}
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded m-2"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => setEditingOrder(order)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                >
                  Edit Order
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No orders found.</p>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={(updatedOrder) => handleEditOrder(editingOrder.id, updatedOrder)}
        />
      )}
    </div>
  );
};

export default OrderTrackingPage;
