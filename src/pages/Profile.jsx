import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Profile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [addressBook, setAddressBook] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [cart, setCart] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState('');
  const navigate = useNavigate();
   const {  removeFromCart } = useCart();

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('users')) || [];
    const loggedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentUser = localStorageData.find(user => user.id === loggedUser.id);
    if (currentUser) {
      fetch(`http://localhost:3001/users/${loggedUser.id}`)
        .then(response => response.json())
        .then(userData => {
          setUser(userData);
          setCart(userData.cart || []);
         
        })
        .catch(error => console.error('Failed to fetch user data', error));
    }
  }, []);

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    const updatedDetails = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value || user.password,
    };

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        updateLocalStorage(data);
        alert('Details updated successfully');
      })
      .catch(error => console.error('Failed to update details', error));
  };

  const updateLocalStorage = (updatedUser) => {
    const localStorageData = JSON.parse(localStorage.getItem('users')) || [];
    const updatedLocalStorageData = localStorageData.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedLocalStorageData));
  };

  const handleDeleteAccount = () => {
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove user from local storage
        const localStorageData = JSON.parse(localStorage.getItem('users')) || [];
        const updatedLocalStorageData = localStorageData.filter(user => user.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updatedLocalStorageData));

        sessionStorage.removeItem('currentUser');
        navigate('/login');
      })
      .catch(error => console.error('Failed to delete account', error));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8">Profile</h1>

        {/* Personal Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Personal Details</h2>
          <form onSubmit={handleUpdateDetails} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-600 dark:text-gray-400">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={user?.username}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-600 dark:text-gray-400">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-600 dark:text-gray-400">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Leave empty to keep current password"
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
            >
              Update Details
            </button>
          </form>
        </section>

        {/* Your Orders Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Orders</h2>
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{order.title}</h3>
                <p>Status: {order.status}</p>
                <button
                  className="mt-2 bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-400"
                  onClick={() => /* handle cancel order */ {}}
                >
                  Cancel Order
                </button>
                <button
                  className="mt-2 ml-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
                  onClick={() => /* handle track order */ {}}
                >
                  Track Order
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Saved Items Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Saved Items</h2>
          <ul className="space-y-4">
            {savedItems.map(item => (
              <li key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <button
                  className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-400"
                  onClick={() => /*  remove from saved items */ {}}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Address Book Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Address Book</h2>
          <ul className="space-y-4">
            {addressBook.map(address => (
              <li key={address.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{address.addressLine1}</h3>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <button
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
                  onClick={() => /* handle edit address */ {}}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-400"
                  onClick={() => /* handle delete address */ {}}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* pending Reviews Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Pending Reviews</h2>
          <ul className="space-y-4">
            {pendingReviews.map(review => (
              <li key={review.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{review.productName}</h3>
                <p>Your review: {review.text}</p>
                <button
                  className="bg-gray-600 dark:bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-400"
                  onClick={() => /* handle edit review */ {}}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Cart Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Cart</h2>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <button
                  className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-400"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="bg-gray-600 dark:bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-400"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-400"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
