import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ||{};
    console.log("Current User:", currentUser);
    setIsAdmin(currentUser.role === "admin");
    console.log("Is Admin:", currentUser.role === "admin"); 

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
  };

  const handleEditOrder = (orderId, updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, ...updatedOrder } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order updated successfully!");
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success("Order canceled successfully!");
  };

  const calculateProgress = (status, deliveryDate) => {
    if (status === "Delivered") return 100;

    const deliveryDateObj = new Date(deliveryDate);
    const today = new Date();
    const deliveryDuration = 5; // Days for delivery
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setDate(startDate.getDate() + deliveryDuration);

    if (today > deliveryDateObj) return 100; // Delivered

    const totalDuration = Math.ceil((deliveryDateObj - startDate) / (1000 * 60 * 60 * 24));
    const progress = 100 - Math.ceil((totalDuration / deliveryDuration) * 100);
    return Math.max(0, Math.min(progress, 100)); // Clamp between 0% and 100%
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
              <p className="text-gray-600">Expected Delivery: {order.deliveryDate}</p>
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
              <h3 className="text-lg font-semibold mt-4">Order Progress</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-600">
                      {progress === 100 ? "Delivered" : "In Progress"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>

              <div className="text-gray-500 text-sm">
                <p>Your order is {progress}% complete and on its way!</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleMarkAsDone(order.id)}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Mark as Done
                    </button>
                    <button
                      onClick={() => setEditingOrder(order)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit Order
                    </button>
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Cancel Order
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}

      {/* Edit Order Modal */}
      {editingOrder && isAdmin && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Order #{editingOrder.id}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedOrder = {
                  deliveryDate: e.target.deliveryDate.value,
                  status: e.target.status.value,
                };
                handleEditOrder(editingOrder.id, updatedOrder);
                setEditingOrder(null);
              }}
            >
              <div className="mb-4">
                <label htmlFor="deliveryDate" className="block text-gray-700 mb-2">Delivery Date:</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  defaultValue={editingOrder.deliveryDate.split("T")[0]} // Adjust date format
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 mb-2">Status:</label>
                <select
                  id="status"
                  name="status"
                  defaultValue={editingOrder.status}
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="bg-red-500 text-white p-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
