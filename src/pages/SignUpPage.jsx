// src/pages/SignUpPage.jsx
import React from 'react';

const SignUpPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={() => navigateTo('login')}
          className="mt-6 text-gray-500 hover:underline text-sm"
        >
          Go back to Login
        </button>
        <button
          onClick={() => navigateTo('dashboard')}
          className="mt-2 text-gray-500 hover:underline text-sm block"
        >
          Go back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
