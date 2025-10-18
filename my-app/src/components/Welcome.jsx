import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Welcome = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🍕',
      title: 'Wide Variety',
      description: 'Choose from thousands of restaurants and cuisines'
    },
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Enjoy great food at unbeatable prices with exclusive offers'
    },
    {
      icon: '⭐',
      title: 'Quality Assured',
      description: 'Only top-rated restaurants with verified reviews'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-2xl animate-bounce">
                <span className="text-6xl">🍔</span>
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'
            }`}>
              Welcome to Sweegy
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your favorite food delivered fresh, fast, and right to your doorstep. 
              Discover thousands of restaurants and cuisines in your city.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/login')}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  🚀 Get Started - Login
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className={`px-8 py-4 border-2 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                📝 Create New Account
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  10,000+
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Restaurants
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  1M+
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  30min
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Avg Delivery
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  24/7
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Sweegy?
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Experience the best food delivery service in your city
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-orange-500 hover:bg-gray-750' 
                    : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-xl'
                }`}
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Order?
          </h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join millions of satisfied customers and start your food journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🔑 Login to Continue
            </button>
            <button
              onClick={() => navigate('/signup')}
              className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-white'
              }`}
            >
              📝 Sign Up Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`py-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 Sweegy. Made with ❤️ for food lovers everywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;