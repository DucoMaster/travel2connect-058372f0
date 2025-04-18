
import React from 'react';

const GuidesFooter = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <div className="bg-travel-500 text-white p-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-bold text-travel-700">Travel2Connect</span>
          </div>
          <div className="text-center sm:text-right text-sm text-gray-500">
            <p>© 2025 Travel2Connect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GuidesFooter;

