// src/pages/LoginPage.jsx
import React from 'react';

const LoginPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
        <form className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('signup')}
            className="text-blue-600 hover:underline font-medium"
          >
            Click here to sign up
          </button>
        </p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="mt-4 text-gray-500 hover:underline text-sm"
        >
          Go back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
