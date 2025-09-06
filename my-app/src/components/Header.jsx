import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useOnlinestatus from '../utils/useOnlinestatus';
import UserContext from '../utils/UserContext';

function Header() {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark/light mode
  const onlineStatus = useOnlinestatus();
  const { loggedInUser } = useContext(UserContext); // Destructure loggedInUser from context

  useEffect(() => {
    // Log mount or state change (optional, remove in production)
    // console.log("useEffect called");
  }, [btnNameReact]); // Run effect when btnNameReact changes

  // Apply dark mode class to the document body for global styling
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]); // Run effect when isDarkMode changes

  return (
    <header className={`bg-gradient-to-r ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'} shadow-xl sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="logo-container">
            <img
              className="h-24 w-auto object-contain"
              src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"
              alt="Food Logo"
            />
          </div>
          <div className="flex items-center">
            <ul className="flex items-center space-x-6">
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                Online Status: <span className={onlineStatus ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}>
                  {onlineStatus ? "Online" : "Offline"}
                </span>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/about">About Us</Link>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/Grocery">Grocery</Link>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}
                  onClick={() => {
                    setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                    // console.log(btnNameReact); // Removed for production
                  }}
                >
                  {btnNameReact}
                </button>
              </li>
              <li>
                <button
                  className={`px-2 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-400' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400'}`}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} px-4`}>
                {loggedInUser || "Guest"} {/* Fallback to "Guest" if loggedInUser is undefined */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;