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

  // Enhanced image URL logic with multiple fallbacks
  const getImageUrl = (item) => {
    console.log("=== IMAGE DEBUG ===");
    console.log("Full item:", item);
    console.log("Item card:", item?.card);
    console.log("Item card info:", item?.card?.info);
    
    // Try all possible image field locations
    let imageId = null;
    
    // Check nested structure first (API format)
    if (item?.card?.info) {
      imageId = item.card.info.cloudinaryImageId || 
                item.card.info.imageId || 
                item.card.info.imageUrl ||
                item.card.info.mediaId ||
                item.card.info.itemAttribute?.cloudinaryImageId;
    }
    
    // If not found, try direct structure (cart format)
    if (!imageId) {
      imageId = item?.cloudinaryImageId || 
                item?.imageId || 
                item?.imageUrl ||
                item?.mediaId;
    }
    
    console.log("Item name:", item?.card?.info?.name || item?.name);
    console.log("Image ID found:", imageId);
    
    if (imageId) {
      // Try different URL patterns
      const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300/${imageId}`;
      console.log("Generated image URL:", imageUrl);
      return imageUrl;
    }
    
    // If no image ID, try to use a default food image
    console.log("Using default food image");
    return "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center";
  };

  // Handle image load error
  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoaded(true);
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
    console.log("Full item data:", item);
    console.log("Item card info:", item?.card?.info);
    
    if (!isAuthenticated) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }
    
    // Extract the item info from the API structure
    const itemInfo = item?.card?.info;
    
    if (!itemInfo) {
      console.error("No item info found!");
      alert("Error: Item information not available");
      return;
    }
    
    // Create a properly structured item for the cart
    const itemToAdd = {
      name: itemInfo.name || "Unknown Item",
      price: itemInfo.price || itemInfo.defaultPrice || 0,
      cloudinaryImageId: itemInfo.cloudinaryImageId,
      imageId: itemInfo.imageId,
      imageUrl: itemInfo.imageUrl,
      mediaId: itemInfo.mediaId,
      description: itemInfo.description,
      avgRating: itemInfo.avgRating,
      itemAttribute: itemInfo.itemAttribute,
      isPopular: itemInfo.isPopular,
      isVeg: itemInfo.isVeg
    };
    
    console.log("Structured item for cart:", itemToAdd);
    console.log("Dispatching addItem action...");
    
    try {
      dispatch(addItem(itemToAdd));
      console.log("Item dispatched successfully!");
      
      // Show success notification
      const button = e.target;
      const originalText = button.textContent;
      button.textContent = "✓ Added";
      button.classList.add("bg-green-500");
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-500");
      }, 1000);
    } catch (error) {
      console.error("Error dispatching item:", error);
      alert("Error adding item to cart!");
    }
    console.log("=== END ADD ITEM DEBUG ===");
  };

  const isVeg = item?.card?.info?.itemAttribute?.vegClassifier === "VEG";
  const isNonVeg = item?.card?.info?.itemAttribute?.vegClassifier === "NONVEG";

  return (
    <div 
      className={`group relative bg-white ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Content */}
      <div className="p-4">
        {/* Image Section */}
        <div className="relative mb-4">
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
            {!imageError ? (
              <img
                src={getImageUrl(item)}
                alt={item?.card?.info?.name || "Item Image"}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : null}
            
            {/* Loading/Error State */}
            {!imageLoaded && !imageError && (
              <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}
            
            {imageError && (
              <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🍽️</div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No Image</p>
                </div>
              </div>
            )}

            {/* Veg/Non-Veg Indicator */}
            {(isVeg || isNonVeg) && (
              <div className="absolute top-2 left-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isVeg ? '🟢' : '🔴'}
                </div>
              </div>
            )}

            {/* Add Button */}
            <button 
              className={`absolute bottom-2 right-2 w-10 h-10 rounded-full text-white font-bold shadow-lg transition-all duration-300 flex items-center justify-center z-10 ${
                isHovered 
                  ? 'bg-orange-500 scale-110' 
                  : 'bg-black hover:bg-gray-800'
              }`}
              onClick={handleAddItem}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-2">
          {/* Name */}
          <h3 className={`font-semibold text-lg leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-orange-600 transition-colors duration-300`}>
            {item?.card?.info?.name || "No Name"}
          </h3>

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              ₹{getItemPrice(item) || "0.00"}
            </span>
            {getRating(item) !== "N/A" && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getRating(item)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {item?.card?.info?.description && (
            <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.card.info.description}
            </p>
          )}

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            {item?.card?.info?.isVeg !== undefined && (
              <span className={`px-2 py-1 rounded-full ${isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            )}
            {item?.card?.info?.isPopular && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
    </div>
  );
};

export default Item;