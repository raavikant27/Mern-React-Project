import React, { useState, useEffect } from "react";
import { Formik } from "formik"; // import Formik from formik
import * as Yup from "yup"; // import Yup from yup
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/authSlice";
import "../styles/Login.css";

// create a schema for validation
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAnimation, setLoginAnimation] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin(values) {
    setIsLoading(true);
    setLoginAnimation(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate login process
    const userData = {
      user: {
        name: values.email.split('@')[0], // Use email prefix as name
        email: values.email
      },
      token: 'mock-jwt-token-' + Date.now()
    };
    
    // Dispatch login action
    dispatch(login(userData));
    
    // Success message and navigation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 500);
  }
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          // call handleLogin and pass input field data
          handleLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className={`py-8 px-4 sm:px-6 lg:px-8 relative ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
              : 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50'
          }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse ${
                isDarkMode ? 'bg-blue-600' : 'bg-orange-200'
              }`}></div>
              <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000 ${
                isDarkMode ? 'bg-purple-600' : 'bg-red-200'
              }`}></div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500 ${
                isDarkMode ? 'bg-green-600' : 'bg-yellow-200'
              }`}></div>
            </div>

            {/* Main Container - Responsive */}
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 relative z-10 px-4">
              <div className="w-full max-w-sm sm:max-w-md mx-auto">
                {/* Logo Section - Responsive */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg mb-2 sm:mb-3 hover:scale-105 transition-transform">
                    <span className="text-xl sm:text-2xl">🍔</span>
                  </div>
                  <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode 
                      ? 'from-orange-400 to-red-400' 
                      : 'from-orange-600 to-red-600'
                  }`}>
                    Sweegy
                  </h1>
                  <p className={`mt-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Delicious food delivered to your door
                  </p>
                </div>

                <div className={`py-4 px-3 sm:py-6 sm:px-4 lg:px-8 shadow-xl rounded-xl sm:rounded-2xl border transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-gray-800/95 backdrop-blur-lg border-gray-700' 
                    : 'bg-white/95 backdrop-blur-lg border-white/20'
                } ${loginAnimation ? 'transform scale-105' : ''}`}>
                  <div className="text-center mb-3 sm:mb-4">
                    <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome Back!
                    </h2>
                    <p className={`text-xs sm:text-sm lg:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Sign in to continue your food journey
                    </p>
                  </div>

                  {/* Quick Login Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2 mb-3 sm:mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleLogin({ email: 'demo@sweegy.com', password: 'password123' });
                      }}
                      className={`flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2 border rounded-lg shadow-sm text-xs sm:text-xs font-medium hover:scale-105 transition-all duration-200 ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-1">👤</span>
                      Demo User
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleLogin({ email: 'guest@sweegy.com', password: 'password123' });
                      }}
                      className={`flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2 border rounded-lg shadow-sm text-xs sm:text-xs font-medium hover:scale-105 transition-all duration-200 ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-1">🎭</span>
                      Guest
                    </button>
                  </div>

                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>Or continue with email</span>
                    </div>
                  </div>

                  <form noValidate onSubmit={handleSubmit} className="space-y-4">
                  {/* Email input */}
                  <div className="group">
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      📧 Email Address
                    </label>
                    <div className="relative">
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Enter your email"
                          className={`w-full px-4 py-2.5 pl-10 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm ${
                            errors.email && touched.email 
                              ? isDarkMode 
                                ? 'border-red-500 bg-red-900/20 text-white placeholder-red-300' 
                                : 'border-red-300 bg-red-50 text-gray-900 placeholder-gray-400'
                              : isDarkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 group-hover:border-gray-500'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 group-hover:border-gray-400'
                          }`}
                          id="email"
                        />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>@</span>
                      </div>
                    </div>
                    {errors.email && touched.email && (
                      <div className="mt-2 flex items-center text-sm text-red-600 animate-pulse">
                        <span className="mr-1">⚠️</span>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Password input */}
                  <div className="group">
                    <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      🔒 Password
                    </label>
                    <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Enter your password"
                          className={`w-full px-4 py-2.5 pl-10 pr-10 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-sm ${
                            errors.password && touched.password 
                              ? isDarkMode 
                                ? 'border-red-500 bg-red-900/20 text-white placeholder-red-300' 
                                : 'border-red-300 bg-red-50 text-gray-900 placeholder-gray-400'
                              : isDarkMode
                                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 group-hover:border-gray-500'
                                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 group-hover:border-gray-400'
                          }`}
                        />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>🔑</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                          isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <span className="text-lg">{showPassword ? '🙈' : '👁️'}</span>
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <div className="mt-2 flex items-center text-sm text-red-600 animate-pulse">
                        <span className="mr-1">⚠️</span>
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Submit button */}
                  <div>
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                          isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25'
                        }`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Signing you in...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="mr-2">🚀</span>
                            Sign In
                          </div>
                        )}
                      </button>
                  </div>

                    {/* Additional Options */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className={`rounded shadow-sm text-orange-600 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-4 h-4 ${
                            isDarkMode 
                              ? 'border-gray-600 bg-gray-700 focus:border-orange-300' 
                              : 'border-gray-300 bg-white focus:border-orange-300'
                          }`}
                        />
                        <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-orange-600 hover:text-orange-500 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {/* Sign up link */}
                    <div className={`text-center pt-3 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        New to Sweegy? 
                        <button 
                          type="button" 
                          className="ml-1 text-orange-600 hover:text-orange-500 font-medium hover:underline transition-colors"
                          onClick={() => navigate("/signup")}
                        >
                          Create account
                        </button>
                      </p>
                    </div>
                  </form>

                  {/* Social Login Options */}
                  <div className="mt-4">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>Or connect with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center py-2 px-3 border rounded-lg shadow-sm text-sm font-medium hover:scale-105 transition-all duration-200 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">🔍</span>
                      </button>
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center py-2 px-3 border rounded-lg shadow-sm text-sm font-medium hover:scale-105 transition-all duration-200 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">📘</span>
                      </button>
                      <button
                        type="button"
                        className={`w-full inline-flex justify-center py-2 px-3 border rounded-lg shadow-sm text-sm font-medium hover:scale-105 transition-all duration-200 ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">🍎</span>
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 text-center">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      By signing in, you agree to our{' '}
                      <a href="#" className="text-orange-600 hover:underline">Terms</a>
                      {' '}and{' '}
                      <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
