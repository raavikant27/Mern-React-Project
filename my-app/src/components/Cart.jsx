import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, cleartCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

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
    
    return imageFields
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208/${imageFields}`
      : "https://via.placeholder.com/80";
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
    <div className="p-4 m-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-green-100"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <h1 className="text-xl text-gray-600">Cart is empty. Add Items to the cart!</h1>
            <p className="text-gray-500 mt-2">Go back to the menu and add some delicious items!</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="p-4 m-2 border-gray-200 border-b-2 text-left flex items-center justify-between bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center w-9/12">
                {/* Item Image */}
                <div className="w-20 h-20 flex-shrink-0 mr-4">
                  <img
                    src={getImageUrl(item)}
                    alt={item?.name || "Item Image"}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                </div>
                
                {/* Item Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item?.name || "Unknown Item"}
                  </h3>
                  {item?.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center mt-2">
                    <span className="font-bold text-green-600">
                      ₹{getItemPrice(item)}
                    </span>
                    {item?.isVeg === 1 && (
                      <span className="ml-2 text-green-600 text-sm">🟢 Veg</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Remove Button */}
              <div className="w-3/12 text-right">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        
        {/* Total Price */}
        {cartItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold text-green-600">₹{calculateTotal()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;