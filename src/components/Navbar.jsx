import React, { useEffect, useState, useRef } from 'react';
import { FaSearch, FaBell, FaUser, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust the import path as needed

const Navbar = () => {
  const navigate = useNavigate();
  // Get cart count
  const { cartCount } = useCart(); 
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    // user from sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    }


    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem('currentUser');
    // Optionally clear cart or other user-specific data
    localStorage.removeItem("cart");
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
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
        <button><FaBell className="text-gray-600 hover:text-gray-800 h-5 w-5" /></button>
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

        <div className="relative z-10" ref={dropdownRef}>
          <div onClick={toggleDropdown} className="cursor-pointer flex items-center">
            <FaUser className="text-gray-600 hover:text-gray-800 h-5 w-5" />
          </div>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/addproducts" className="block px-4 py-2 hover:bg-gray-100">Add Product</NavLink>
                      </li>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-100">Manage Orders</NavLink>
                      </li>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/customers" className="block px-4 py-2 hover:bg-gray-100">Manage Customers</NavLink>
                      </li>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                      </li>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</NavLink>
                      </li>
                        <li onClick={handleOptionClick}>
                          <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</NavLink>
                        </li>
                    </>
                  )}
                  <li onClick={handleLogout} className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100">
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li onClick={handleOptionClick}>
                    <NavLink to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</NavLink>
                  </li>
                  <li onClick={handleOptionClick}>
                    <NavLink to="/register" className="block px-4 py-2 hover:bg-gray-100">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
