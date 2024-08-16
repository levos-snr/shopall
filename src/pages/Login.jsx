import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    setLoading(true);

    try {
      // Fetch users from the API
      const response = await fetch("https://json-server-vercel-8mwp.vercel.app/users");
      const users = await response.json();

      // Find user with matching credentials
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-base-200">
      <div className="w-full max-w-md bg-base-100 dark:bg-base-300 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-base-content dark:text-base-content text-center">
          Login
        </h2>
        <p className="mt-2 text-center text-base-content dark:text-base-content">
          Access your account
        </p>
        <form className="mt-4" onSubmit={handleOnSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-base-content dark:text-base-content">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleOnChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-base-content dark:text-base-content">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleOnChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary dark:bg-primary-focus text-white rounded-md hover:bg-primary-focus dark:hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-light dark:focus:ring-primary-dark"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <p className="text-base-content dark:text-base-content mb-2">
            Or sign in with
          </p>
          <div className="flex space-x-4">
            <button className="btn btn-outline btn-primary">
              <FaGoogle className="mr-2" /> Google
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p className="text-base-content dark:text-base-content">
            First Time Here{" "}
            <Link
              to="/register"
              className="text-primary dark:text-primary-focus hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
