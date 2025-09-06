import React from 'react';

function Footer({ isDarkMode }) {
  const footerClass = `py-4 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`;
  return (
    <footer className={footerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 Food Delivery App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;