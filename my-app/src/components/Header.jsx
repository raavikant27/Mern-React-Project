import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/authSlice';
import { addItem } from '../utils/cartSlice';
import useOnlinestatus from '../utils/useOnlinestatus';
import UserContext from '../utils/UserContext';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark/light mode
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

  // Test function to add item to cart
  const testAddItem = () => {
    const testItem = {
      name: "Test Item",
      price: 10000,
      cloudinaryImageId: "test-image",
      description: "This is a test item"
    };
    console.log("Adding test item to cart:", testItem);
    dispatch(addItem(testItem));
  };
  // Handle login/logout
  const handleAuthClick = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/");
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
              <li className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}>
                <Link to="/cart">Cart ({cartItems.length} items)</Link>
              </li>
              <li>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors mr-2"
                  onClick={testAddItem}
                >
                  Test Add
                </button>
              </li>
              <li>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}
                  onClick={handleAuthClick}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </button>
              </li>
              {isAuthenticated && user && (
                <li className='px-4 font-bold text-green-600'>
                  Welcome, {user.name}
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart for mobile */}
            <Link 
              to="/cart" 
              className={`text-sm font-bold ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
            >
              Cart ({cartItems.length})
            </Link>
            
            {/* Login/Logout button for mobile */}
            <button
              className={`px-3 py-1 text-xs font-semibold rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}
              onClick={handleAuthClick}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;