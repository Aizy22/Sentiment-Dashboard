// src/pages/SettingsPage.jsx
import React from 'react';

const SettingsPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>
        <p className="text-gray-600 mb-6">
          This is where your application settings would be configured.
        </p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Go back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
