// src/pages/YoutubeInsightsPage.jsx
import React from 'react';

const YoutubeInsightsPage = ({ navigateTo, report }) => {
  if (!report) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-sans text-gray-800">
        <h1 className="text-3xl font-bold mb-4">No YouTube Report Data</h1>
        <p className="text-lg text-gray-600 mb-6">Please go back to the dashboard and analyze a video first.</p>
        <button
          onClick={() => navigateTo('dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { metadata, analysis } = report;
  const { comments, report: fullReport } = analysis;
  const { sentiment_summary, categorized_comments, actionable_insights } = fullReport;

  // Prepare data for breakdown bars
  const breakdownData = [
    { label: "Positive", value: sentiment_summary.Positive, color: "bg-green-500" },
    { label: "Neutral", value: sentiment_summary.Neutral, color: "bg-gray-400" },
    { label: "Negative", value: sentiment_summary.Negative, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">YouTube Video Analysis Report</h1>
        <button
          onClick={() => navigateTo('dashboard')}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Video Metadata */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Video Metadata</h2>
        <p className="text-gray-700"><strong>Video ID:</strong> {metadata.video_id}</p>
        <p className="text-gray-700"><strong>URL:</strong> <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{metadata.url}</a></p>
        <p className="text-gray-700"><strong>Comments:</strong> {metadata.comment_count}</p>
        <p className="text-gray-700"><strong>Likes:</strong> {metadata.likes}</p>
        <p className="text-gray-700"><strong>Dislikes:</strong> {metadata.dislikes}</p>
      </div>

      {/* Overall Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Overall Report Summary</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{fullReport.summary}</p>
      </div>

      {/* Sentiment Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Sentiment Distribution</h2>
        <div className="space-y-4">
          {breakdownData.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-medium text-gray-700">{item.value.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Comments */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Categorized Comments</h2>
        {Object.keys(categorized_comments).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 capitalize mb-2">
              {category.replace(/_/g, ' ')} ({categorized_comments[category].length})
            </h3>
            {categorized_comments[category].length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                {categorized_comments[category].slice(0, 5).map((comment, index) => ( // Show first 5 comments
                  <li key={index}>{comment}</li>
                ))}
                {categorized_comments[category].length > 5 && (
                  <li className="font-medium text-gray-500">...and {categorized_comments[category].length - 5} more.</li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No {category.replace(/_/g, ' ')} comments found.</p>
            )}
          </div>
        ))}
      </div>

      {/* Actionable Insights */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Actionable Insights</h2>
        {actionable_insights.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {actionable_insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No specific actionable insights generated.</p>
        )}
      </div>

      {/* Individual Comments (Optional: display a few or add pagination) */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">Raw Comments (First 10)</h2>
        {comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.slice(0, 10).map((comment, index) => ( // Display first 10 comments
              <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                <p className="text-gray-700 text-sm mb-1">{comment.text}</p>
                <p className="text-xs text-gray-500">
                  Sentiment: <span className={`font-semibold ${
                    comment.sentiment === 'Positive' ? 'text-green-600' :
                    comment.sentiment === 'Negative' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>{comment.sentiment}</span> | Confidence: {(comment.confidence * 100).toFixed(2)}%
                </p>
              </div>
            ))}
            {comments.length > 10 && (
              <p className="text-gray-500 text-center text-sm mt-4">...and {comments.length - 10} more comments.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No individual comments available.</p>
        )}
      </div>
    </div>
  );
};

export default YoutubeInsightsPage;
