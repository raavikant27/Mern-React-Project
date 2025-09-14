import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem, cleartCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { isAuthenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debug logging
  console.log("Cart component rendered");
  console.log("Cart items:", cartItems);
  console.log("Cart items length:", cartItems.length);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Helper function to get item price
  const getItemPrice = (item) => {
    const price = item?.price || item?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };

  // Helper function to get image URL
  const getImageUrl = (item) => {
    const imageFields = [
      item?.cloudinaryImageId,
      item?.imageId,
      item?.imageUrl,
      item?.mediaId,
    ].find(field => field);
    
    console.log("=== CART IMAGE DEBUG ===");
    console.log("Cart item name:", item?.name);
    console.log("Cart image fields:", imageFields);
    console.log("Full cart item:", item);
    
    if (imageFields) {
      const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300/${imageFields}`;
      console.log("Cart generated image URL:", imageUrl);
      return imageUrl;
    }
    
    console.log("No image field found in cart, using default food image");
    return "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center";
  };

  // Helper function to check if item is veg
  const isVeg = (item) => {
    return item?.itemAttribute?.vegClassifier === "VEG";
  };

  // Helper function to get item rating
  const getItemRating = (item) => {
    return item?.avgRating || "N/A";
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem(index));
  };

  const handleClearCart = () => {
    dispatch(cleartCart());
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item?.price || item?.defaultPrice || 0;
      return total + (price / 100);
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Go back to the menu and add some delicious items!</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Item Image */}
                  <div className="w-full sm:w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={getImageUrl(item)}
                        alt={item?.name || "Item Image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/120";
                        }}
                      />
                      {/* Veg/Non-Veg Indicator */}
                      {isVeg(item) !== undefined && (
                        <div className="absolute top-2 left-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isVeg(item) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isVeg(item) ? '🟢' : '🔴'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {item?.name || "Unknown Item"}
                      </h3>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{getItemPrice(item)}
                      </span>
                    </div>
                    
                    {item?.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getItemRating(item) !== "N/A" && (
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-medium text-gray-600">
                              {getItemRating(item)}
                            </span>
                          </div>
                        )}
                        {isVeg(item) !== undefined && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isVeg(item) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isVeg(item) ? 'Veg' : 'Non-Veg'}
                          </span>
                        )}
                        {item?.isPopular && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <div className="flex justify-end sm:justify-start">
                    <button
                      className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Total Price */}
        {cartItems.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
              <p className="text-gray-600">Review your items before checkout</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-700">Items ({cartItems.length}):</span>
                <span className="text-xl font-bold text-gray-800">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-600">Delivery Fee:</span>
                <span className="text-lg font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">Total:</span>
                  <span className="text-3xl font-bold text-green-600">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                🛒 Proceed to Checkout
              </button>
              <button 
                onClick={handleClearCart}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;