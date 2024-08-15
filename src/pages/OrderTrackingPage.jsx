import React, { useEffect, useState } from "react";

const OrderTrackingPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const progress = 60;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Order Tracking</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
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
                    <h4 className="text-md">{item.name}</h4>
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
                    In Progress
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
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderTrackingPage;
