import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, cleartCart, addItem } from "../utils/cartSlice";

const Cart = ({ isDarkMode }) => {
  const cartItems = useSelector((store) => store.cart.items);
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [quantities, setQuantities] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((_, index) => {
      initialQuantities[index] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  // Remove login requirement - allow guests to use cart
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  // Helper function to get item price
  const getItemPrice = (item) => {
    const price = item?.price || item?.defaultPrice || 0;
    return (price / 100);
  };

  // Helper function to get image URL
  const getImageUrl = (item) => {
    const imageFields = [
      item?.cloudinaryImageId,
      item?.imageId,
      item?.imageUrl,
      item?.mediaId,
    ].find(field => field);
    
    if (imageFields) {
      return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300/${imageFields}`;
    }
    
    return "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center";
  };

  // Helper function to check if item is veg
  const isVeg = (item) => {
    return item?.itemAttribute?.vegClassifier === "VEG";
  };

  // Helper function to get item rating
  const getItemRating = (item) => {
    return item?.avgRating || "4.0";
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
    const newQuantities = { ...quantities };
    delete newQuantities[index];
    setQuantities(newQuantities);
  };

  const handleClearCart = () => {
    dispatch(cleartCart());
    setQuantities({});
    setDiscount(0);
    setCouponCode('');
  };

  const updateQuantity = (index, change) => {
    const newQuantity = (quantities[index] || 1) + change;
    if (newQuantity > 0) {
      setQuantities({
        ...quantities,
        [index]: newQuantity
      });
    }
  };

  const applyCoupon = () => {
    const coupons = {
      'SAVE10': 10,
      'FIRST20': 20,
      'WELCOME15': 15,
      'STUDENT5': 5
    };
    
    if (coupons[couponCode.toUpperCase()]) {
      setDiscount(coupons[couponCode.toUpperCase()]);
      alert(`🎉 Coupon applied! You saved ${coupons[couponCode.toUpperCase()]}%`);
    } else {
      alert('❌ Invalid coupon code');
      setDiscount(0);
    }
  };

  // Calculate total price with quantities
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item, index) => {
      const price = getItemPrice(item);
      const quantity = quantities[index] || 1;
      return total + (price * quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    const deliveryFee = subtotal > 300 ? 0 : 40;
    return subtotal - discountAmount + deliveryFee;
  };

  const handleCheckout = () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter delivery address');
      return;
    }
    
    // For guest users, show option to continue as guest or login
    if (!isAuthenticated) {
      const continueAsGuest = confirm('Continue as guest or login for faster checkout?\n\nClick OK to continue as guest\nClick Cancel to login');
      if (!continueAsGuest) {
        navigate('/login');
        return;
      }
    }
    
    setShowCheckout(true);
    // Simulate order processing
    setTimeout(() => {
      const userName = isAuthenticated ? user?.name || 'User' : 'Guest';
      alert(`🎉 Order placed successfully, ${userName}! You will receive updates on your phone.`);
      handleClearCart();
      setShowCheckout(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className={`py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Responsive */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-2xl mb-4 sm:mb-6 transform hover:scale-110 transition-all duration-300">
            <span className="text-2xl sm:text-4xl">🛒</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse px-4">
            Your Cart
          </h1>
          <p className={`text-lg sm:text-xl lg:text-2xl font-medium px-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            <span className="block sm:inline">{isAuthenticated ? `Welcome back, ${user?.name || 'User'}! 🎉` : 'Welcome, Guest! 👋'}</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline mt-2 sm:mt-0">
              {cartItems.length > 0 ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                  {cartItems.length} delicious items waiting for you! ✨
                </span>
              ) : (
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your cart is empty 📭</span>
              )}
            </span>
          </p>
          {!isAuthenticated && cartItems.length > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl max-w-md mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
              <p className="text-sm font-medium">
                💡 <button 
                  onClick={() => navigate('/login')} 
                  className="underline hover:text-yellow-300 font-bold transition-colors"
                >
                  Login now
                </button> for faster checkout and order tracking!
              </p>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-16 max-w-lg mx-auto border border-white/20 dark:border-gray-700/50">
              <div className="relative">
                <div className="text-9xl mb-8 animate-bounce">🛒</div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 mb-6">
                Cart is Empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10 text-xl leading-relaxed">
                Looks like you haven't added anything to your cart yet.<br />
                <span className="text-purple-500 font-medium">Let's fix that! 🍴</span>
              </p>
              <div className="space-y-5">
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1"
                >
                  🍽️ Browse Restaurants
                </button>
                <button
                  onClick={() => navigate('/grocery')}
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-1"
                >
                  🥬 Shop Groceries
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items - Responsive */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 dark:border-gray-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 flex items-center flex-wrap">
                    <span className="mr-2">🍽️ Your Items</span>
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base lg:text-lg font-bold shadow-lg">
                      {cartItems.length}
                    </span>
                  </h2>
                  <button 
                    onClick={handleClearCart}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl lg:rounded-2xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  >
                    🗑️ Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-[1.02] border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        {/* Item Image - Responsive */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 flex-shrink-0 mx-auto sm:mx-0">
                          <div className="relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
                            <img
                              src={getImageUrl(item)}
                              alt={item?.name || "Item Image"}
                              className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500 filter group-hover:brightness-110"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/128x128/8B5CF6/FFFFFF?text=🍽️";
                              }}
                            />
                            {/* Veg/Non-Veg Indicator */}
                            <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center shadow-lg border border-white sm:border-2 ${
                                isVeg(item) ? 'bg-green-500' : 'bg-red-500'
                              }`}>
                                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white rounded-full"></div>
                              </div>
                            </div>
                            {/* Floating Price Badge */}
                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg">
                              ₹{getItemPrice(item).toFixed(0)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Item Details - Responsive */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 mb-2 sm:mb-3 leading-tight">
                            {item?.name || "Unknown Item"}
                          </h3>
                          
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg">
                              <span className="text-white text-xs sm:text-sm">⭐</span>
                              <span className="text-xs sm:text-sm font-bold text-white ml-1">
                                {getItemRating(item)}
                              </span>
                            </div>
                            <span className={`px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-2 rounded-full text-xs sm:text-sm lg:text-sm font-bold shadow-lg ${
                              isVeg(item) 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
                            }`}>
                              {isVeg(item) ? '🌱 Veg' : '🍖 Non-Veg'}
                            </span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                                ₹{getItemPrice(item).toFixed(2)}
                              </span>
                              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                                × {quantities[index] || 1} = ₹{(getItemPrice(item) * (quantities[index] || 1)).toFixed(2)}
                              </div>
                            </div>
                            {/* Quantity Controls - Responsive */}
                            <div className="flex items-center space-x-2 sm:space-x-4">
                              <div className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-xl sm:rounded-2xl border border-purple-200 sm:border-2 dark:border-gray-500 shadow-lg">
                                <button
                                  onClick={() => updateQuantity(index, -1)}
                                  className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-lg sm:text-xl font-bold text-red-500 hover:bg-red-500 hover:text-white rounded-l-xl sm:rounded-l-2xl transition-all duration-300 transform hover:scale-110"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 font-bold text-sm sm:text-base lg:text-lg text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-x border-purple-200 sm:border-x-2 dark:border-gray-500">
                                  {quantities[index] || 1}
                                </span>
                                <button
                                  onClick={() => updateQuantity(index, 1)}
                                  className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 text-lg sm:text-xl font-bold text-green-500 hover:bg-green-500 hover:text-white rounded-r-xl sm:rounded-r-2xl transition-all duration-300 transform hover:scale-110"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1"
                                title="Remove item"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Section - Responsive */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-gray-800 dark:via-purple-900 dark:to-indigo-900 rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-purple-200/50 dark:border-purple-700/50">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4 sm:mb-6 flex items-center justify-center sm:justify-start">
                  🎫 Apply Coupon Code
                </h3>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g., SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 border-2 border-purple-300 dark:border-purple-600 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base sm:text-lg font-medium transition-all duration-300 shadow-lg placeholder-purple-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1"
                  >
                    Apply ✨
                  </button>
                </div>
                <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                  {['SAVE10', 'FIRST20', 'WELCOME15', 'STUDENT5'].map((code) => (
                    <button
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="px-2 py-2 sm:px-3 sm:py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary - Responsive */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900 dark:to-indigo-900 rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 sticky top-4 border border-purple-200/50 dark:border-purple-700/50">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 lg:mb-8 flex items-center justify-center lg:justify-start">
                  📋 Order Summary
                </h3>
                
                <div className="space-y-4 sm:space-y-6 mb-6 lg:mb-8">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Subtotal</span>
                    <span className="font-bold text-lg sm:text-xl text-gray-800 dark:text-white">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl sm:rounded-2xl border border-green-300 dark:border-green-700">
                      <span className="text-green-700 dark:text-green-300 font-medium flex items-center text-sm sm:text-base">
                        <span className="mr-1">🎉</span>
                        <span className="hidden sm:inline">Discount </span>
                        <span>({discount}%)</span>
                      </span>
                      <span className="font-bold text-lg sm:text-xl text-green-600 dark:text-green-400">-₹{((calculateSubtotal() * discount) / 100).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white/70 dark:bg-gray-700/70 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Delivery Fee</span>
                    <span className={`font-bold text-lg sm:text-xl ${calculateSubtotal() > 300 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                      {calculateSubtotal() > 300 ? (
                        <span className="flex items-center">
                          <span className="mr-1 sm:mr-2">🚚</span>FREE
                        </span>
                      ) : '₹40'}
                    </span>
                  </div>
                  
                  <div className="border-t-4 border-gradient-to-r from-purple-400 to-pink-400 pt-6 mt-6">
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-2xl">
                      <span className="text-2xl font-bold">Total Amount</span>
                      <span className="text-3xl font-bold">₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-8">
                  <label className="flex items-center text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
                    📍 Delivery Address
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your complete address with pincode..."
                    rows={4}
                    className="w-full px-6 py-4 border-2 border-purple-300 dark:border-purple-600 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-all duration-300 shadow-lg placeholder-purple-400"
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-5">
                  <button
                    onClick={handleCheckout}
                    disabled={showCheckout}
                    className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {showCheckout ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Order... 🔄
                      </span>
                    ) : (
                      '🚀 Place Order Now'
                    )}
                  </button>
                  
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 px-6 rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    �️ Continue Shopping
                  </button>
                </div>

                {/* Estimated Delivery */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">🚚</span>
                      <div>
                        <div className="font-bold text-lg">Estimated Delivery</div>
                        <div className="text-blue-100">Fast & Fresh</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl">25-35</div>
                      <div className="text-blue-100">minutes</div>
                    </div>
                  </div>
                </div>

                {/* Free Delivery Info */}
                {calculateSubtotal() <= 300 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white">
                    <div className="text-center">
                      <div className="font-bold">🎯 Add ₹{(300 - calculateSubtotal()).toFixed(2)} more</div>
                      <div className="text-sm text-orange-100">for FREE delivery!</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;