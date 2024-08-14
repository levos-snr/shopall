import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-base-200 py-12 px-4">
      <div className="w-full max-w-md bg-base-100 dark:bg-base-300 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-base-content dark:text-base-content text-center">
          Register
        </h2>
        <p className="mt-2 text-center text-base-content dark:text-base-content">
          Create a new account
        </p>
        <form className="mt-6">
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
            <button className="btn btn-outline btn-secondary">
              <FaGithub className="mr-2" /> GitHub
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