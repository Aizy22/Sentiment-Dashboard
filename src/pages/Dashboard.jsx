// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";

const Dashboard = ({ navigateTo }) => {
  // Base URL for your backend API
  // CORRECTED: Removed '/docs' from the base URL.
  // IMPORTANT: Ensure this matches your *current* ngrok forwarding URL.
  const API_BASE_URL = "https://52dd-102-212-60-154.ngrok-free.app";

  // State for Sentiment Score Breakdown collapse
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(false);

  // State for selected filters (e.g., "Positive", "Neutral", "Negative", "All")
  const [selectedFilters, setSelectedFilters] = useState(["All"]); // Initialize with "All" selected

  // State for API data
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState(""); // YouTube URL input
  // This will store the full JSON response from the YouTube API
  const [youtubeAnalysisReport, setYoutubeAnalysisReport] = useState(null);
  const [overallSentimentData, setOverallSentimentData] = useState(null); // For analyze-sentiment endpoint
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API Call Functions ---


  // Function to fetch YouTube Comments/Insights
  // Endpoint from Swagger: /youtube/youtube/comments (POST)
  const fetchYouTubeCommentsAnalysis = async (videoUrl) => {
    if (!videoUrl) {
      setError("Please enter a YouTube video URL.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Confirmed: Method is POST, URL is clean, body contains video_url
      const response = await fetch(`${API_BASE_URL}/youtube/youtube/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoUrl }), // URL sent in the request body
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setYoutubeAnalysisReport(data); // Store the full response
      console.log("YouTube Analysis Report fetched:", data);

      // Navigate to the YouTube Insights detail page after successful fetch
      navigateTo('youtube-insights-detail', { report: data });

    } catch (e) {
      setError("Failed to fetch YouTube analysis: " + e.message);
      console.error("Error fetching YouTube analysis:", e);
    } finally {
      setLoading(false);
    }
  };

  // Function to analyze sentiment (for the "Analyze Now" button)
  // Endpoint from Swagger: /analyze-sentiment (POST)
  // CRITICAL FIX: Backend expects `texts: List[str]`, so send an array.
  const analyzeSentiment = async (textToAnalyze) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/analyze-sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // FIX: Sending 'texts' as an array, as per backend's CommentData schema
        body: JSON.stringify({ texts: [textToAnalyze] }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      // The backend returns a list of analyzed comments.
      // For overall sentiment display, we might need to aggregate this.
      // Assuming you want the sentiment of the *first* analyzed text for display.
      if (data && data.length > 0) {
          setOverallSentimentData({
              sentiment: data[0].sentiment,
              score: data[0].confidence
          });
      }
      console.log("Sentiment analysis result:", data);
    } catch (e) {
      setError("Failed to analyze sentiment: " + e.message);
      console.error("Error analyzing sentiment:", e);
    } finally {
      setLoading(false);
    }
  };

  // --- Frontend Filtering Logic for Sentiment Breakdown ---
  const getFilteredSentimentBreakdown = () => {
    // Check if the full report and its sentiment_summary are available
    if (!youtubeAnalysisReport || !youtubeAnalysisReport.analysis || !youtubeAnalysisReport.analysis.report || !youtubeAnalysisReport.analysis.report.sentiment_summary) {
        // Fallback to static data if no real data or distribution is found
        return [
            { label: "Positive", value: 47.25, color: "bg-green-500" }, // Using values from your provided JSON
            { label: "Neutral", value: 12.09, color: "bg-gray-400" },
            { label: "Negative", value: 40.66, color: "bg-red-500" },
        ];
    }

    const sentimentSummary = youtubeAnalysisReport.analysis.report.sentiment_summary;
    // Transform the object into an array suitable for the chart
    const fullDistribution = [
      { label: "Positive", value: sentimentSummary.Positive, color: "bg-green-500" },
      { label: "Neutral", value: sentimentSummary.Neutral, color: "bg-gray-400" },
      { label: "Negative", value: sentimentSummary.Negative, color: "bg-red-500" },
    ];

    // If "All" is selected, return the full distribution from the API
    if (selectedFilters.includes("All")) {
      return fullDistribution;
    }

    // Filter based on selected sentiment labels (Positive, Neutral, Negative)
    const sentimentLabels = ["Positive", "Neutral", "Negative"];
    const activeSentimentFilters = selectedFilters.filter(f => sentimentLabels.includes(f));

    if (activeSentimentFilters.length === 0) {
      return fullDistribution; // If no specific sentiment filter, show all from API
    }

    return fullDistribution.filter(item =>
      activeSentimentFilters.includes(item.label)
    );
  };


  // --- Handlers ---

  const handleToggleBreakdown = () => {
    setIsBreakdownExpanded(!isBreakdownExpanded);
  };

  const handleFilterClick = (filterLabel) => {
    let newFilters;
    if (filterLabel === "All") {
      newFilters = ["All"];
    } else {
      newFilters = selectedFilters.filter((f) => f !== "All");
      if (newFilters.includes(filterLabel)) {
        newFilters = newFilters.filter((f) => f !== filterLabel);
      } else {
        newFilters = [...newFilters, filterLabel];
      }
      if (newFilters.length === 0) {
        newFilters = ["All"];
      }
    }
    setSelectedFilters(newFilters);
  };

  const handleAnalyzeNow = () => {
    console.log("Analyze Now button clicked!");
    // You might want a dedicated input for this, or analyze a default text.
    // For now, it analyzes a static string.
    analyzeSentiment("The new Cars.co.za app is incredibly user-friendly and I love the new features!");
  };

  const handleApplyFilters = () => {
    console.log("APPLY Filters button clicked!");
    console.log("Selected Filters to apply (frontend logic):", selectedFilters);
    // This button primarily triggers the re-calculation of breakdownDataToDisplay
    // based on the selectedFilters state and the already fetched youtubeAnalysisReport.
    // If you had a backend endpoint for filtering comments, you'd call it here.
  };

  const handleCalendarClick = () => {
    console.log("Calendar button clicked!");
  };

  const handleYouTubeCardClick = () => {
    console.log("YouTube Insights card clicked!");
    fetchYouTubeCommentsAnalysis(youtubeVideoUrl); // Pass the URL from state
  };

  // --- Initial Data Fetch on Component Mount ---
  useEffect(() => {
    // No auto-fetch for YouTube comments on mount as it requires a URL input.
    // User will manually trigger the fetch.
  }, []);

  // --- Render ---
  const breakdownDataToDisplay = getFilteredSentimentBreakdown();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      {/* HEADER SECTION */}
      <header
        className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center text-white flex flex-col justify-between p-4 sm:p-6 pb-0"
        style={{ backgroundImage: "url('/HeaderCars2.webp')" }}
      >
        {/* Top Header Row - Responsive padding and gap */}
        <div className="flex justify-between items-center z-10 w-full px-2 sm:px-4">
          {/* Left Section - Now contains the Cars.co.za Logo image */}
          <div className="flex items-center gap-2 sm:gap-4">
            <img src="/images.png" alt="Cars.co.za Logo" className="h-10 sm:h-12" />
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('login')}
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
              onClick={() => navigateTo('dashboard')}
            >
              🏠
            </span>
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo('settings')}
            >
              ⚙️
            </span>
          </div>
        </div>

        {/* Gradient Overlay for better text readability on background image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
      </header>

      {/* MAIN CONTENT AREA - Responsive padding and column layout */}
      <main className="container mx-auto p-4 sm:p-6 -mt-20 sm:-mt-24 z-20 relative grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 flex-grow">
        {/* Loading and Error Indicators */}
        {loading && <div className="lg:col-span-2 text-center py-4 text-blue-600">Loading data...</div>}
        {error && <div className="lg:col-span-2 text-center py-4 text-red-600">Error: {error}</div>}

        {/* TOP INSIGHTS CARDS - Responsive grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* YouTube Insights Card - Clickable and visually interactive */}
          <div
            className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col items-start cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:-translate-y-1"
            onClick={handleYouTubeCardClick} // This will now use the URL from the input
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl sm:text-3xl mr-2">▶️</span>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">YouTube Insights</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Review powerful historical marketing data from your YouTube audiences sentiments.
            </p>
            {/* YouTube URL Input Field */}
            <input
              type="text"
              placeholder="Paste YouTube video URL here"
              className="w-full p-2 mt-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={youtubeVideoUrl}
              onChange={(e) => setYoutubeVideoUrl(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Prevent card click when input is clicked
              disabled={loading}
            />
            {/* Display fetched data or prompt */}
            {youtubeAnalysisReport ? (
                <span className="block mt-2 text-blue-600">
                  Total Comments: {youtubeAnalysisReport.metadata.comment_count || 'N/A'},
                  Avg. Sentiment: {((youtubeAnalysisReport.analysis.report.sentiment_summary.Positive || 0) + (youtubeAnalysisReport.analysis.report.sentiment_summary.Neutral || 0) + (youtubeAnalysisReport.analysis.report.sentiment_summary.Negative || 0)).toFixed(2)}%
                </span>
              ) : (
                <span className="block mt-2 text-gray-500">Enter URL and click card to fetch data.</span>
              )}
          </div>
          <div className="hidden md:block"></div>
        </div>


        {/* MIDDLE SECTION - AUDIENCE SENTIMENT & FILTER - Responsive grid */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col justify-between items-start">
          {/* Left: Audience Sentiment */}
          <div className="flex flex-col items-start mb-4 sm:mb-6">
            <div className="flex items-end">
              <span className="text-4xl sm:text-5xl text-gray-700 mr-2">✉️</span>
              <span className="text-3xl sm:text-4xl font-bold text-gray-700">AUDIENCE</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-red-600 mt-2">Sentiment</h2>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-3xl sm:text-4xl text-gray-500 transform -rotate-45">→</span>
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-200 text-base sm:text-lg"
              onClick={handleAnalyzeNow}
              disabled={loading}
            >
              Analyze Now
            </button>
          </div>
          {overallSentimentData && (
            <div className="mt-4 text-green-600">
              Overall Sentiment: {overallSentimentData.sentiment || 'N/A'} (Score: {((overallSentimentData.score || 0) * 100).toFixed(2)}%)
            </div>
          )}
        </div>

        {/* Right: Filter Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center mb-3 sm:mb-4">
            {/* Filter Icon (Inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75ZM4.5 9.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75ZM6 15.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Zm6 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 0 1.5H12.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Filter</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-4">Review powerful historical marketing data from your Instagram audiences sentiments</p>

          {/* Filter Buttons - Responsive gap and text size */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {[
              "All",
              "Positive",
              "Negative",
              "Neutral",
            ].map((label) => (
              <button
                key={label}
                className={`
                  bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full transition duration-200 flex items-center whitespace-nowrap
                  ${selectedFilters.includes(label) ? "bg-blue-600 !text-white hover:bg-blue-700" : "hover:bg-gray-200"}
                `}
                onClick={() => handleFilterClick(label)}
                disabled={loading}
              >
                {/* Small circles for sentiment types */}
                {label === "Positive" && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>}
                {label === "Neutral" && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full mr-1.5 sm:mr-2"></span>}
                {label === "Negative" && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1.5 sm:mr-2"></span>}
                {label}
              </button>
            ))}
          </div>

          {/* Calendar and Apply - Responsive gap and padding */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition duration-200 text-sm sm:text-base"
              onClick={handleCalendarClick}
              disabled={loading}
            >
              🗓️ Calendar {/* Calendar icon */}
            </button>
          </div>

          <button
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-200 text-base sm:text-lg"
            onClick={handleApplyFilters}
            disabled={loading}
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
                {/* Use dynamically filtered breakdownDataToDisplay */}
                {breakdownDataToDisplay.length > 0 ? (
                  breakdownDataToDisplay.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          {item.value.toFixed(2)}% {/* Ensure value is formatted */}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div
                          className={`${
                            item.label === "Positive" ? "bg-green-500" :
                            item.label === "Neutral" ? "bg-gray-400" :
                            "bg-red-500"
                          } h-2 sm:h-3 rounded-full`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No sentiment breakdown data available for selected filters.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER SECTION - Responsive padding and text size */}
      <footer className="bg-red-600 text-white p-3 sm:p-4 text-center text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center mt-auto">
        <div className="mb-2 sm:mb-0">
          <p>made by Tech4dreams</p>
          <p>Customer Support Contact: <a href="mailto:asakhe.kondlo@capaciti.org.za" className="underline">asakhe.kondlo@capaciti.org.za</a></p>
        </div>
        <img src="/path/to/your/small-tech4dreams-logo.png" alt="Tech4dreams Logo" className="h-7 sm:h-8" />
      </footer>
    </div>
  );
};

export default Dashboard;
