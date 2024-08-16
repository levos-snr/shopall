import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    cart: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, role,cart } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (user) => user.email === email || user.username === username
    );

    if (userExists) {
      toast.error("User with this email or username already exists!");
      return;
    }

    const newUser = { 
      id: Date.now().toString(), 
      username, 
      email, 
      password, 
      role ,
      cart
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user to the server.");
      }

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-base-200 py-12 px-4">
      <div className="w-full max-w-md bg-base-100 dark:bg-base-300 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-base-content dark:text-base-content text-center">
          Register
        </h2>
        <p className="mt-2 text-center text-base-content dark:text-base-content">
          Create a new account
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="username"
              className="text-base-content dark:text-base-content"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="px-3 py-2 bg-base-200 dark:bg-base-400 text-base-content dark:text-base-content rounded-md focus:outline-none focus:ring focus:ring-primary"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="email"
              className="text-base-content dark:text-base-content"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-2 bg-base-200 dark:bg-base-400 text-base-content dark:text-base-content rounded-md focus:outline-none focus:ring focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="text-base-content dark:text-base-content"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-2 bg-base-200 dark:bg-base-400 text-base-content dark:text-base-content rounded-md focus:outline-none focus:ring focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-base-content dark:text-base-content"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-3 py-2 bg-base-200 dark:bg-base-400 text-base-content dark:text-base-content rounded-md focus:outline-none focus:ring focus:ring-primary"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary dark:bg-primary-focus text-white rounded-md hover:bg-primary-focus dark:hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-light dark:focus:ring-primary-dark"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <p className="text-base-content dark:text-base-content mb-2">
            Or sign up with
          </p>
          <div className="flex space-x-4">
            <button className="btn btn-outline btn-primary">
              <FaGoogle className="mr-2" /> Google
            </button>
           
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <p className="text-base-content dark:text-base-content">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary dark:text-primary-focus hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
