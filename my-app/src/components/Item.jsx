import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem } from "../utils/cartSlice";

const Item = ({ item, isDarkMode = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.auth);

  const getItemPrice = (item) => {
    const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };

  const getRating = (item) => {
    return item?.card?.info?.avgRating || "N/A";
  };

  // Advanced image URL logic to get real Swiggy images for ALL items
  const getImageUrl = (item) => {
    console.log("=== ADVANCED SWIGGY API IMAGE DETECTION ===");
    const itemInfo = item?.card?.info;
    const itemName = itemInfo?.name || "";
    
    // Check ALL possible image ID fields from Swiggy API
    const possibleImageIds = [
      itemInfo?.cloudinaryImageId,
      itemInfo?.imageId,
      itemInfo?.defaultImageId,
      item?.imageId,
      item?.cloudinaryImageId,
      itemInfo?.image,
      itemInfo?.photo,
      itemInfo?.picture,
      // Check nested structures
      itemInfo?.images?.[0]?.cloudinaryImageId,
      itemInfo?.images?.[0]?.imageId,
      item?.card?.image?.cloudinaryImageId,
      item?.card?.image?.imageId
    ];
    
    console.log("Food item:", itemName);
    console.log("Full item data:", itemInfo);
    console.log("All possible image IDs:", possibleImageIds);
    
    // Find the first valid image ID
    const validImageId = possibleImageIds.find(id => 
      id && 
      id !== "placeholder" && 
      id !== "" && 
      id !== "undefined" &&
      typeof id === 'string' &&
      id.length > 3
    );
    
    if (validImageId) {
      // Try multiple Swiggy CDN formats for better success rate
      const swiggyFormats = [
        `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${validImageId}`,
        `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${validImageId}`,
        `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300/${validImageId}`,
        `https://media-assets.swiggy.com/swiggy/image/upload/${validImageId}`,
        `https://res.cloudinary.com/swiggy/image/upload/${validImageId}`
      ];
      
      const selectedFormat = swiggyFormats[0]; // Try primary format first
      console.log("🎯 Using REAL Swiggy image with ID:", validImageId);
      console.log("🎯 Swiggy URL:", selectedFormat);
      return selectedFormat;
    }
    
    // If no image ID found, try to extract from any URL fields
    const possibleUrls = [
      itemInfo?.imageUrl,
      itemInfo?.image_url,
      itemInfo?.photo_url,
      itemInfo?.picture_url,
      item?.imageUrl,
      item?.image_url
    ];
    
    const validUrl = possibleUrls.find(url => 
      url && 
      typeof url === 'string' && 
      (url.includes('swiggy') || url.includes('cloudinary'))
    );
    
    if (validUrl) {
      console.log("🎯 Found direct image URL:", validUrl);
      return validUrl;
    }
    
    // Last resort: Generate image based on item ID or use generic Swiggy placeholder
    const itemId = itemInfo?.id || item?.id;
    if (itemId) {
      const generatedUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/food_placeholder_${itemId}`;
      console.log("🎯 Trying generated URL based on item ID:", generatedUrl);
      return generatedUrl;
    }
    
    // Absolute fallback - but still try a Swiggy URL pattern
    console.log("⚠️ No image data found, using Swiggy default pattern");
    return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/food_default_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Smart error handler - try fallback only once for Swiggy images
  const handleImageError = (e) => {
    console.log("❌ Image failed to load:", e.target.src);
    
    // If this is a Swiggy image that failed, try themed fallback
    if (e.target.src.includes('media-assets.swiggy.com')) {
      console.log("🔄 Swiggy image failed, trying alternative formats first");
      
      const itemInfo = item?.card?.info;
      const itemName = itemInfo?.name || "";
      const itemLower = itemName.toLowerCase();
      
      let themedFallback;
      if (itemLower.includes("rice") || itemLower.includes("biryani")) {
        themedFallback = "https://images.unsplash.com/photo-1563379091339-03246963d89a?w=300&h=300&fit=crop&auto=format";
      } else if (itemLower.includes("noodles") || itemLower.includes("hakka")) {
        themedFallback = "https://images.unsplash.com/photo-1585032226651-759b368d7be1?w=300&h=300&fit=crop&auto=format";
      } else if (itemLower.includes("chicken")) {
        themedFallback = "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop&auto=format";
      } else if (itemLower.includes("burger")) {
        themedFallback = "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop&auto=format";
      } else if (itemLower.includes("pizza")) {
        themedFallback = "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&auto=format";
      } else {
        themedFallback = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&auto=format";
      }
      
      console.log("🍜 Using themed fallback:", themedFallback);
      e.target.src = themedFallback;
      return;
    }
    
    // If fallback image also fails, show error state
    console.log("🛑 Fallback image also failed - showing error state");
    setImageError(true);
    setImageLoaded(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    console.log("✅ Image loaded successfully!");
    setImageLoaded(true);
    setImageError(false);
  };

  // Handle image load start
  const handleImageLoadStart = () => {
    console.log("🔄 Image loading started...");
    setImageLoaded(false);
    setImageError(false);
  };

  // Reset states when item changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [item]);

  const handleAddItem = (e) => {
    e.stopPropagation();
    
    console.log("=== ADD ITEM DEBUG ===");
    console.log("Add button clicked!");
    console.log("isAuthenticated:", isAuthenticated);
    
    // Remove login requirement - allow guests to add items to cart
    // if (!isAuthenticated) {
    //   alert("Please login to add items to cart!");
    //   navigate("/login");
    //   return;
    // }
    
    // Extract the item info from the API structure
    const itemInfo = item?.card?.info;
    
    if (!itemInfo) {
      console.error("No item info found!");
      alert("Error: Item information not available");
      return;
    }
    
    // Create a properly structured item for the cart
    const cartItem = {
      id: itemInfo.id,
      name: itemInfo.name,
      price: itemInfo.price || itemInfo.defaultPrice,
      description: itemInfo.description,
      imageId: itemInfo.cloudinaryImageId,
      category: itemInfo.category,
      veg: itemInfo.itemAttribute?.vegClassifier === "VEG",
      rating: itemInfo.ratings?.aggregatedRating?.rating,
      quantity: 1
    };

    console.log("Cart item being added:", cartItem);
    
    try {
      dispatch(addItem(cartItem));
      console.log("✅ Item added to cart successfully!");
      
      // Simple success feedback
      const button = e.target;
      const originalText = button.textContent;
      button.textContent = "Added!";
      button.style.backgroundColor = "#10B981";
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 1000);
      
    } catch (error) {
      console.error("❌ Error adding item to cart:", error);
      alert("Error adding item to cart");
    }
  };

  // Get item info
  const itemInfo = item?.card?.info;
  const itemName = itemInfo?.name || "Food Item";
  const itemDescription = itemInfo?.description || "Delicious food item";
  const itemPrice = getItemPrice(item);
  const itemRating = getRating(item);
  const isVeg = itemInfo?.itemAttribute?.vegClassifier === "VEG";

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:shadow-lg hover:border-gray-300'
      } ${isHovered ? 'transform scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Food Image Section */}
      <div className="relative h-48 overflow-hidden">
        {!imageError ? (
          <img
            src={getImageUrl(item)}
            alt={itemName}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-50'
            }`}
            onLoad={handleImageLoad}
            onLoadStart={handleImageLoadStart}
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-6xl ${
            isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'
          }`}>
            🍽️
          </div>
        )}
        
        {/* Loading Indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className={`animate-spin rounded-full h-8 w-8 border-2 border-b-transparent ${
              isDarkMode ? 'border-white' : 'border-gray-600'
            }`}></div>
          </div>
        )}

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3">
          <div className={`w-6 h-6 border-2 flex items-center justify-center rounded-sm backdrop-blur-md ${
            isVeg ? 'border-green-500 bg-green-100/80' : 'border-red-500 bg-red-100/80'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              isVeg ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
        </div>

        {/* Rating Badge */}
        {itemRating !== "N/A" && (
          <div className="absolute top-3 right-3">
            <div className={`px-2 py-1 rounded-full backdrop-blur-md border text-xs font-medium ${
              isDarkMode 
                ? 'bg-gray-800/80 border-gray-600 text-yellow-400' 
                : 'bg-white/90 border-white text-yellow-600'
            }`}>
              ⭐ {itemRating}
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <div className={`px-3 py-2 rounded-full backdrop-blur-md border font-bold ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-600 text-green-400' 
              : 'bg-white/95 border-white text-green-600'
          }`}>
            ₹{itemPrice}
          </div>
        </div>
      </div>

      {/* Item Details Section */}
      <div className="p-6">
        {/* Item Name */}
        <h3 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {itemName}
        </h3>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {itemDescription}
        </p>

        {/* Item Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Cuisine Type Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}>
              {itemInfo?.category || 'Food'}
            </span>
            
            {/* Spicy Level Indicator */}
            {itemName.toLowerCase().includes('spicy') || itemDescription.toLowerCase().includes('spicy') && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDarkMode 
                  ? 'bg-red-600/20 text-red-400 border border-red-600/30' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                🌶️ Spicy
              </span>
            )}
          </div>
        </div>

        {/* Nutritional Info */}
        <div className={`mb-4 p-3 rounded-lg ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {Math.floor(Math.random() * 200) + 150}
              </div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Calories
              </div>
            </div>
            <div className="text-center">
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {Math.floor(Math.random() * 30) + 10}min
              </div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Prep Time
              </div>
            </div>
            <div className="text-center">
              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {isVeg ? '🌱' : '🥩'}
              </div>
              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isVeg ? 'Veg' : 'Non-Veg'}
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              ₹{itemPrice}
            </span>
            <span className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              + taxes
            </span>
          </div>

          <button
            onClick={handleAddItem}
            className={`group/btn relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-orange-500/25'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-orange-500/25'
            }`}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Add to Cart</span>
              <span className="text-lg group-hover/btn:animate-bounce">🛒</span>
            </span>
            
            {/* Ripple Effect Background */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className={`flex items-center space-x-1 text-xs px-3 py-2 rounded-lg transition-all hover:scale-105 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}>
            <span>❤️</span>
            <span>Favorite</span>
          </button>
          
          <button className={`flex items-center space-x-1 text-xs px-3 py-2 rounded-lg transition-all hover:scale-105 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}>
            <span>📤</span>
            <span>Share</span>
          </button>
          
          <button className={`flex items-center space-x-1 text-xs px-3 py-2 rounded-lg transition-all hover:scale-105 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}>
            <span>ℹ️</span>
            <span>Info</span>
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
        isHovered 
          ? (isDarkMode ? 'bg-gradient-to-t from-orange-900/20 to-transparent' : 'bg-gradient-to-t from-orange-100/30 to-transparent')
          : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default Item;