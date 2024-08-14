import { FaSearch, FaBell, FaUser, FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from sessionStorage
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
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
        <button><FaShoppingCart className="text-gray-600 hover:text-gray-800 h-5 w-5" /></button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer">
              <FaUser className="text-gray-600 hover:text-gray-800 h-5 w-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
              {user.role === "admin" ? (
                <>
                  <li><NavLink to="/addproducts">Add Product</NavLink></li>
                  <li><NavLink to="/orders">Manage Orders</NavLink></li>
                  <li><NavLink to="/customers">Manage Customers</NavLink></li>
                  <li><NavLink to="/settings">Settings</NavLink></li>
                </>
              ) : (
                <>
                <li><NavLink to="/profile">Profile</NavLink></li>
                 <li><NavLink to="/settings">Settings</NavLink></li>
                </>
              )}
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer">
              <FaUser className="text-gray-600 hover:text-gray-800 h-5 w-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Register</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
