import React from "react";
import { Instagram, Youtube } from "lucide-react";

const MetricsCard = ({ platform, sentiment }) => {
  const isInstagram = platform === "Instagram";
  const Icon = isInstagram ? Instagram : Youtube;
  const bgColor = isInstagram ? "bg-pink-100" : "bg-red-100";
  const textColor = isInstagram ? "text-pink-600" : "text-red-600";

  return (
    <div className={`rounded-2xl shadow-md p-6 ${bgColor} w-full`}>
      <div className="flex items-center gap-4 mb-4">
        <Icon className={`w-6 h-6 ${textColor}`} />
        <h2 className={`text-lg font-semibold ${textColor}`}>{platform}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-1">Sentiment Score</p>
      <p className="text-3xl font-bold text-gray-900">{sentiment}</p>
    </div>
  );
};

export default MetricsCard;
