import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOnlinestatus from '../utils/useOnlinestatus';

function Header() {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const onlineStatus = useOnlinestatus();

  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);

  return (
    <header className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-xl sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="logo-container">
            <img
              className="h-24 w-auto object-contain"
              src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"
              alt="Food Logo"
            />
          </div>
          <div className="flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Online Status: <span className={onlineStatus ? "text-green-600" : "text-red-600"}>
                  {onlineStatus ? "Online" : "Offline"}
                </span>
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                <Link to="/about">About Us</Link>
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                <Link to="/Grocery">Grocery</Link>
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                console.log(btnNameReact);
              }}
            >
              {btnNameReact}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;