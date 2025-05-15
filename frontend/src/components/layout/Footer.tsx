import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} WorkTide. All rights reserved.</p>
          </div>
          <div className="text-sm">
            <p>Created by Stanislav Burakov | <a 
              href="https://github.com/layn1asol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub: @layn1asol
            </a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 