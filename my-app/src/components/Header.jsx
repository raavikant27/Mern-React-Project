import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/authSlice';
import { addItem } from '../utils/cartSlice';
import useOnlinestatus from '../utils/useOnlinestatus';
import UserContext from '../utils/UserContext';

function Header({ isDarkMode, setIsDarkMode }) {
  const onlineStatus = useOnlinestatus();
  const { loggedInUser } = useContext(UserContext); // Destructure loggedInUser from context
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const cartItems = useSelector((store) => store.cart.items);

  // Debug logging
  console.log("Header - Cart items:", cartItems);
  console.log("Header - Cart items length:", cartItems.length);


  // Handle login/logout
  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/"); // This will show Welcome page after logout
    } else {
      navigate("/login");
    }
  };

  // Apply dark mode class to the document body for global styling
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]); // Run effect when isDarkMode changes

  // const data =useContext(UserContext);

  return (
    <header className={`bg-gradient-to-r ${isDarkMode ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'} shadow-xl sticky top-0 z-10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-16 w-auto sm:h-20 lg:h-24 object-contain"
              src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"
              alt="Food Logo"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6">
              {/* Always show theme toggle and online status */}
              <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                Online Status: <span className={onlineStatus ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}>
                  {onlineStatus ? "🟢 Online" : "🔴 Offline"}
                </span>
              </li>
              
              {/* Theme Toggle Button - Always visible */}
              <li>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                      : 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  }`}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <span className="text-lg">
                    {isDarkMode ? '☀️' : '🌙'}
                  </span>
                </button>
              </li>

              {/* Navigation items - Only show when authenticated */}
              {isAuthenticated && (
                <>
                  <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                    <Link to="/dashboard" className="hover:scale-105 transition-transform">🏠 Home</Link>
                  </li>
                  <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                    <Link to="/about" className="hover:scale-105 transition-transform">ℹ️ About Us</Link>
                  </li>
                  <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                    <Link to="/contact" className="hover:scale-105 transition-transform">📞 Contact Us</Link>
                  </li>
                  <li className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                    <Link to="/grocery" className="hover:scale-105 transition-transform">🛒 Grocery</Link>
                  </li>
                  <li className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                    <Link to="/cart" className="relative hover:scale-105 transition-transform">
                      🛍️ Cart 
                      {cartItems.length > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}
              
              {/* Auth Button */}
              <li>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 transform hover:scale-105 ${
                    isAuthenticated 
                      ? (isDarkMode ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400')
                      : (isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400')
                  }`}
                  onClick={handleAuthClick}
                >
                  {isAuthenticated ? "🚪 Logout" : "🔑 Login"}
                </button>
              </li>

              {/* Welcome Message - Only when authenticated */}
              {isAuthenticated && user && (
                <li className={`px-3 py-2 rounded-lg font-bold ${isDarkMode ? 'text-green-400 bg-gray-800' : 'text-green-600 bg-green-50'} transition-colors`}>
                  👋 Welcome, {user.name}!
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle for mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-700 text-yellow-400'
              }`}
            >
              <span className="text-sm">{isDarkMode ? '☀️' : '🌙'}</span>
            </button>

            {/* Cart for mobile - Only when authenticated */}
            {isAuthenticated && (
              <Link 
                to="/cart" 
                className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors relative`}
              >
                🛍️
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            
            {/* Login/Logout button for mobile */}
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md focus:outline-none focus:ring-2 transition-all ${
                isAuthenticated 
                  ? (isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600')
                  : (isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600')
              }`}
              onClick={handleAuthClick}
            >
              {isAuthenticated ? "🚪" : "🔑"}
            </button>

            {/* Welcome message for mobile - Only when authenticated */}
            {isAuthenticated && user && (
              <span className={`text-xs font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                👋 {user.name.split(' ')[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;