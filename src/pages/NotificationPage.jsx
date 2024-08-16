import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const NotificationPage = () => {
  const { notifications } = useNotifications(); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={notification.id || index} className="p-4 border-b border-gray-200">
              <p className="font-semibold">{notification.title}</p>
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationPage;
