// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage'; // We'll create this
import SignUpPage from './pages/SignUpPage'; // We'll create this
import SettingsPage from './pages/SettingsPage'; // We'll create this

function App() {
  // State to manage the current page being displayed
  const [currentPage, setCurrentPage] = useState('dashboard'); // Default to dashboard

  // Function to change the current page
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    console.log(`Navigating to: ${pageName}`);
  };

  // Conditionally render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      case 'signup':
        return <SignUpPage navigateTo={navigateTo} />;
      case 'settings':
        return <SettingsPage navigateTo={navigateTo} />;
      default:
        return <Dashboard navigateTo={navigateTo} />; // Fallback
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
