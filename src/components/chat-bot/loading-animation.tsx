import React from "react";

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex space-x-2 p-2">
      <div className="w-2 h-2 rounded-full bg-gray-400 chatbot-typing-dot"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 chatbot-typing-dot"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 chatbot-typing-dot"></div>
    </div>
  );
};
