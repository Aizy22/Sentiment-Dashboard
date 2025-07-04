// src/pages/FullReportPage.jsx
import React from 'react';

const FullReportPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Full Report Generation</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        This page would allow you to generate a comprehensive report from your backend.
        <br />
        (Functionality to be implemented later)
      </p>
      <button
        onClick={() => navigateTo('dashboard')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default FullReportPage;
