// src/pages/Dashboard.jsx
import React, { useState } from "react";

// Assuming you still have MetricsCard if you plan to use it later,
// though the current screenshot doesn't show the colored metric cards directly.
// import MetricsCard from "../components/MetricsCard";

const Dashboard = ({ navigateTo }) => { // Accept navigateTo as a prop
  // State for Sentiment Score Breakdown collapse
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);

  // State for selected filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  // --- Handlers ---

  const handleToggleBreakdown = () => {
    setIsBreakdownExpanded(!isBreakdownExpanded);
  };

  const handleFilterClick = (filterLabel) => {
    // If the filter is already selected, remove it
    if (selectedFilters.includes(filterLabel)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filterLabel));
    } else {
      // Otherwise, add it
      setSelectedFilters([...selectedFilters, filterLabel]);
    }
  };

  const handleAnalyzeNow = () => {
    console.log("Analyze Now button clicked!");
    // In a real app, this would trigger data analysis
    // Replaced alert with console.log as per instructions
  };

  const handleApplyFilters = () => {
    console.log("APPLY Filters button clicked!");
    console.log("Selected Filters:", selectedFilters);
    // In a real app, this would fetch data based on selected filters
  };

  const handleCalendarClick = () => {
    console.log("Calendar button clicked!");
    // In a real app, this would open a date picker component
  };

  const handleYouTubeCardClick = () => {
    console.log("YouTube Insights card clicked! Reviewing historical marketing data...");
    // This could navigate to a detailed YouTube insights page or open a modal
    // For now, just a console log.
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col"> {/* Added flex-col for footer push */}
      {/* HEADER SECTION */}
      <header
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center text-white flex flex-col justify-between p-4 sm:p-6 pb-0"
        style={{ backgroundImage: "url('/HeaderCars2.webp')" }}
      >
        {/* Top Header Row - Responsive padding and gap */}
        <div className="flex justify-between items-center z-10 w-full px-2 sm:px-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-red-600 bg-white px-2 py-1 rounded-md font-bold text-base sm:text-lg">Cars.co.za</div>
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('login')} // Clickable Profile icon
            >
              👤
            </span>
          </div>
          {/* Center */}
          <div className="text-xl sm:text-2xl font-bold">Welcome</div>
          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('dashboard')} // Clickable Home icon (to current page)
            >
              🏠
            </span>
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('settings')} // Clickable Settings icon
            >
              ⚙️
            </span>
          </div>
        </div>

        {/* Cars.co.za logo overlayed on the image - Responsive positioning */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-10 z-10">
          <img src="/images.png" alt="Cars.co.za Logo" className="h-16 sm:h-20" />
        </div>

        {/* Gradient Overlay for better text readability on background image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
      </header>

      {/* MAIN CONTENT AREA - Responsive padding and column layout */}
      <main className="container mx-auto p-4 sm:p-6 -mt-20 sm:-mt-24 z-20 relative grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 flex-grow"> {/* Added flex-grow */}

        {/* TOP INSIGHTS CARDS - Responsive grid */}
        {/* Removed Instagram Insights Card. YouTube Insights Card is now the sole card in this section. */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* YouTube Insights Card - Now Clickable */}
          <div
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col items-start cursor-pointer hover:shadow-lg transition-shadow"
            onClick={handleYouTubeCardClick} // Make the card clickable
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl sm:text-3xl mr-2">▶️</span> {/* YouTube icon placeholder */}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">YouTube Insights</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">Review powerful historical marketing data from your YouTube audiences sentiments</p>
          </div>
        </div>

        {/* MIDDLE SECTION - AUDIENCE SENTIMENT & FILTER - Responsive grid */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col justify-between items-start">
          {/* Left: Audience Sentiment */}
          <div className="flex flex-col items-start mb-4 sm:mb-6">
            <div className="flex items-end">
              <span className="text-4xl sm:text-5xl text-gray-700 mr-2">✉️</span> {/* Mail icon placeholder */}
              <span className="text-3xl sm:text-4xl font-bold text-gray-700">AUDIENCE</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-red-600 mt-2">Sentiment</h2>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-3xl sm:text-4xl text-gray-500 transform -rotate-45">→</span> {/* Arrow icon placeholder */}
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-200 text-base sm:text-lg"
              onClick={handleAnalyzeNow}
            >
              Analyze Now
            </button>
          </div>
        </div>

        {/* Right: Filter Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl mr-2">Y</span> {/* Filter icon placeholder */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filter</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Review powerful historical marketing data from your Instagram audiences sentiments</p>

          {/* Filter Buttons - Responsive gap and text size */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {[
              "All Positive",
              "All Neutral",
              "All Negative",
              "Only Comments",
              "Only Likes",
              "Only Shares",
              "All Toxic",
            ].map((label) => (
              <button
                key={label}
                className={`
                  bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full transition duration-200 flex items-center whitespace-nowrap
                  ${selectedFilters.includes(label) ? "bg-blue-600 !text-white hover:bg-blue-700" : "hover:bg-gray-200"}
                `}
                onClick={() => handleFilterClick(label)}
              >
                {/* Small circles for sentiment types */}
                {label.includes("Positive") && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>}
                {label.includes("Neutral") && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mr-1.5 sm:mr-2"></span>}
                {label.includes("Negative") && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1.5 sm:mr-2"></span>}
                {label}
              </button>
            ))}
          </div>

          {/* Calendar and Apply - Responsive gap and padding */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition duration-200 text-sm sm:text-base"
              onClick={handleCalendarClick}
            >
              🗓️ Calendar {/* Calendar icon */}
            </button>
          </div>

          <button
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-200 text-base sm:text-lg"
            onClick={handleApplyFilters}
          >
            APPLY
          </button>
        </div>

        {/* BOTTOM SECTION - SENTIMENT SCORE BREAKDOWN - Responsive padding */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center mb-2 cursor-pointer" onClick={handleToggleBreakdown}>
            <span className="text-lg sm:text-xl mr-2">
              {isBreakdownExpanded ? "🔼" : "🔽"}{" "}
            </span>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Sentiment Score Breakdown</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600">See a detailed explanation of metrics that determine your scores</p>

          {/* Conditionally render the detailed breakdown content */}
          {isBreakdownExpanded && (
            <div className="mt-4 sm:mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Detailed Breakdown</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Positive", value: 68, color: "bg-green-500" },
                  { label: "Neutral", value: 20, color: "bg-gray-400" },
                  { label: "Negative", value: 12, color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div className={`${item.color} h-2 sm:h-3 rounded-full`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER SECTION - Responsive padding and text size */}
      <footer className="bg-red-600 text-white p-3 sm:p-4 text-center text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="mb-2 sm:mb-0"> {/* Added margin bottom for small screens */}
          <p>made by Tech4dreams</p>
          <p>Customer Support Contact: <a href="mailto:asakhe.kondlo@capaciti.org.za" className="underline">asakhe.kondlo@capaciti.org.za</a></p>
        </div>
        <img src="/path/to/your/small-tech4dreams-logo.png" alt="Tech4dreams Logo" className="h-7 sm:h-8" />
      </footer>
    </div>
  );
};

export default Dashboard;
