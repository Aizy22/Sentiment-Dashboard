// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import YoutubeInsightsPage from './pages/YoutubeInsightsPage'; // Import the new YouTube Insights Page
import FullReportPage from './pages/FullReportPage';     // Import the new Full Report Page

function App() {
  // State to manage the current page being displayed
  const [currentPage, setCurrentPage] = useState('dashboard'); // Default to dashboard
  // New state to store data that needs to be passed to the next page
  const [pageData, setPageData] = useState(null);

  // Function to change the current page, now accepting optional data
  const navigateTo = (pageName, data = null) => {
    setCurrentPage(pageName);
    setPageData(data); // Store the data to be passed to the next page
    console.log(`Navigating to: ${pageName}`, data);
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
      case 'youtube-insights-detail': // Case for the YouTube Insights detail page
        // Pass the 'report' data from pageData to the YoutubeInsightsPage
        return <YoutubeInsightsPage navigateTo={navigateTo} report={pageData ? pageData.report : null} />;
      case 'full-report-view': // Case for the Full Report placeholder page
        return <FullReportPage navigateTo={navigateTo} />;
      default:
        return <Dashboard navigateTo={navigateTo} />; // Fallback to dashboard
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
