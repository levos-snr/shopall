import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaUser, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotifications } from '../context/NotificationContext';
import { toast } from 'react-toastify';
import FetchProducts from '../lib/FetchProducts';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { notifications = [], unreadCount = 0 } = useNotifications() || {}; // Handle undefined context
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const dropdownRef = useRef(null);

  const { products } = FetchProducts(); // Fetch products data

  useEffect(() => {
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
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem("cart");
    toast.success('Logged out successfully!');
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setShowSearchPopup(true);
      const filteredResults = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setShowSearchPopup(false);
    }
  };

  const handleSearchResultClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
    setShowSearchPopup(false);
    setSearchQuery(''); // Clear search input
  };

  return (
    <nav className="flex justify-between items-center p-6 mb-10">
      <NavLink to="/" className="text-2xl font-bold tracking-wide text-gray-800">
        SHOPALL
      </NavLink>

      <ul className="flex space-x-6 text-lg font-semibold text-gray-600">
        <NavLink to="/products" className="hover:text-gray-800">Products</NavLink>
        <NavLink to="/category" className="hover:text-gray-800">Categories</NavLink>
        <NavLink to="/support" className="hover:text-gray-800">Support</NavLink>
      </ul>

      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 border rounded"
        />
        {showSearchPopup && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
            <ul>
              {searchResults.map(result => (
                <li
                  key={result.id}
                  onClick={() => handleSearchResultClick(result)}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {result.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button><FaSearch className="text-gray-600 hover:text-gray-800 h-5 w-5" /></button>

        {/* Notification Button */}
        <div className="relative">
          <button onClick={() => navigate('/notifications')}>
            <FaBell className="text-gray-600 hover:text-gray-800 h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        <div>
          <NavLink to="/wishlist">
            <button className="relative">
              <FaHeart className="text-gray-600 hover:text-gray-800 h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 right-0 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold text-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
          </NavLink>
        </div>

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
                        <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</NavLink>
                      </li>
                      <li onClick={handleOptionClick}>
                        <NavLink to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</NavLink>
                      </li>
                    </>
                  )}
                  <li onClick={handleLogout} className="block px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">Logout</li>
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
