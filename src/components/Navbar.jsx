import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaBell, FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import FetchProducts from "../lib/FetchProducts";

const Navbar = ({ notifications }) => {
  const { products } = FetchProducts();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const product = products.map((product) => {
    return product
  })

  console.log(product)
  

  const handleNotificationClick = () => {
    navigate(`/product/${product.id}`, {
      state: product,
    });
    setShowNotifications(false);
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    setUser(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white flex justify-between items-center p-6 shadow-lg mb-10">
      <NavLink to="/" className="text-2xl font-bold tracking-wide text-gray-800">
        SHOPALL
      </NavLink>

      <ul className="flex space-x-6 text-lg font-medium text-gray-600">
        <NavLink to="/products" className="hover:text-gray-800">Products</NavLink>
        <NavLink to="/category" className="hover:text-gray-800">Categories</NavLink>
        <NavLink to="/support" className="hover:text-gray-800">Support</NavLink>
      </ul>

      <div className="flex items-center space-x-4">
        <button><FaSearch className="text-gray-600 hover:text-gray-800 h-5 w-5" /></button>

        <div className="relative">
          <button onClick={handleBellClick} className="relative">
            <FaBell className="text-gray-600 hover:text-gray-800 h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-3 right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-4 top-16 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64 z-50">
              <h3 className="text-lg font-semibold mb-2">Notifications</h3>
              {notifications.length === 0 ? (
                <p className="text-gray-500">No new notifications</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="py-2 text-gray-800 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleNotificationClick(notification.productId)}
                    >
                      {notification.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <NavLink to="/wishlist"><FaHeart className="text-gray-600 hover:text-gray-800 h-5 w-5" /></NavLink>

        <div className="relative">
          <NavLink to="/cart">
            <FaShoppingCart className="text-gray-600 hover:text-gray-800 h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-3 right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        <div className="relative">
          <button onClick={toggleDropdown}><FaUser className="text-gray-600 hover:text-gray-800 h-5 w-5" /></button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40 z-50">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/profile" onClick={handleOptionClick}>Profile</NavLink>
                </li>
                {user ? (
                  <li className="px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Logout</li>
                ) : (
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <NavLink to="/login" onClick={handleOptionClick}>Login</NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
