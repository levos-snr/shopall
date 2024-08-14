import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-dark text-gray-800 dark:text-light p-4">
      <div className="text-center">
        <p className="text-9xl font-bold text-red-500 dark:text-red-600">{error.statusCode || "404"}</p>
        <h1 className="text-2xl font-semibold mt-4">Whoops! {"  "}
        <span className="text-gray-500">
            <i>{error.statusText || error.message}</i>
        </span>

          </h1>

        <p className="mt-2 text-lg">
          The page you are looking for was not found.
        </p>
        <p className="mt-2 text-lg">
          You may return to the
          <a
            href="/"
            className="text-blue-600 hover:underline dark:text-blue-400 ml-1"
          >
            home page
          </a>{" "}
          or try using the search form below.
        </p>
      </div>

      <form className="mt-6 flex w-full max-w-md mx-auto">
        <input
          type="text"
          name="search"
          placeholder="What are you looking for?"
          className="w-full px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-darker text-gray-900 dark:text-light focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-800"
        />
        <button className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-800">
          <span className="sr-only">Search</span>
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ErrorPage;