import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenuNew";
import { SiPanasonic } from "react-icons/si";
import RestaurantCategory from "./RestaurantCategory"; // Import new component
import Item from "./Item";

// Component to display restaurant information
// Enhanced RestaurantInfo component with modern design
const RestaurantInfo = ({ info, isDarkMode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Enhanced image URL function with better fallbacks
  const getRestaurantImageUrl = (info) => {
    const possibleImageIds = [
      info?.cloudinaryImageId,
      info?.imageId,
      info?.defaultImageId,
      info?.image,
      info?.photo
    ];
    
    const validImageId = possibleImageIds.find(id => 
      id && typeof id === 'string' && id.length > 3
    );
    
    if (validImageId) {
      return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_800,h_400,c_fill/${validImageId}`;
    }
    
    // Themed fallback based on restaurant type
    const name = info?.name || "";
    const cuisine = info?.cuisines?.[0] || "";
    
    if (name.toLowerCase().includes("pizza") || cuisine.toLowerCase().includes("pizza")) {
      return "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop&auto=format";
    } else if (name.toLowerCase().includes("burger") || cuisine.toLowerCase().includes("burger")) {
      return "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=400&fit=crop&auto=format";
    } else if (cuisine.toLowerCase().includes("chinese")) {
      return "https://images.unsplash.com/photo-1585032226651-759b368d7be1?w=800&h=400&fit=crop&auto=format";
    } else if (cuisine.toLowerCase().includes("indian")) {
      return "https://images.unsplash.com/photo-1563379091339-03246963d89a?w=800&h=400&fit=crop&auto=format";
    }
    
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop&auto=format";
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-2xl mb-8 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      {/* Restaurant Image Header */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        {!imageError ? (
          <img
            src={getRestaurantImageUrl(info)}
            alt={info?.name || "Restaurant"}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-8xl ${
            isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'
          }`}>
            🏪
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Restaurant Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {info?.name || "Restaurant Name"}
            </h1>
            
            {/* Cuisines */}
            {info?.cuisines && (
              <div className="flex flex-wrap gap-2 mb-4">
                {info.cuisines.slice(0, 4).map((cuisine, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30"
                  >
                    {cuisine}
                  </span>
                ))}
                {info.cuisines.length > 4 && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30">
                    +{info.cuisines.length - 4} more
                  </span>
                )}
              </div>
            )}
            
            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {info?.avgRatingString && (
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="font-semibold text-lg">{info.avgRatingString}</span>
                  {info?.totalRatingsString && (
                    <span className="text-sm opacity-80">({info.totalRatingsString})</span>
                  )}
                </div>
              )}
              
              {info?.sla?.slaString && (
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-xl">🚀</span>
                  <span className="font-semibold">{info.sla.slaString}</span>
                </div>
              )}
              
              {info?.costForTwoMessage && (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 text-xl">💰</span>
                  <span className="font-semibold">{info.costForTwoMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Restaurant Details Cards */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Rating Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-gray-600' : 'bg-green-100'
              }`}>
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-green-800'}`}>
                {info?.avgRatingString || "N/A"}
              </h3>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-green-600'}`}>
                {info?.totalRatingsString || "No ratings"}
              </p>
            </div>
          </div>

          {/* Delivery Time Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-gray-600' : 'bg-blue-100'
              }`}>
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
                {info?.sla?.slaString || "N/A"}
              </h3>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
                Delivery Time
              </p>
            </div>
          </div>

          {/* Cost Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-gray-600' : 'bg-purple-100'
              }`}>
                <span className="text-3xl">💰</span>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
                {info?.costForTwoMessage || "N/A"}
              </h3>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-purple-600'}`}>
                Cost for Two
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-300'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-gray-600' : 'bg-orange-100'
              }`}>
                <span className="text-3xl">📍</span>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-orange-800'}`}>
                {info?.areaName || info?.city || "Location"}
              </h3>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-orange-600'}`}>
                {info?.city ? `${info.areaName}, ${info.city}` : info?.areaName || "Area"}
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Features */}
        {info?.feeDetails || info?.aggregatedDiscountInfoV3 || info?.promoted && (
          <div className={`mt-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-orange-50'}`}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {info?.promoted && (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  ⭐ Promoted
                </span>
              )}
              {info?.feeDetails && (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'
                }`}>
                  🚚 Free Delivery
                </span>
              )}
              {info?.aggregatedDiscountInfoV3 && (
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'
                }`}>
                  🎉 Special Offers Available
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function to extract restaurant info from API response
const extractRestaurantInfo = (cards) => {
  return (
    cards?.find(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    )?.card?.card?.info || {}
  );
};

// Utility function to extract category data from API response
const extractCategories = (cards) => {
  if (!cards) return [];
  const menuCard = cards.find((c) => c.groupedCard);
  const regularCards = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  return regularCards
    .filter((card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    .map((card) => card.card.card);
};

// Main RestaurantMenu component
function RestaurantMenu({ isDarkMode }) { // Added isDarkMode prop for theme support
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOffers, setShowOffers] = useState(false);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  // Fetch restaurant menu data using custom hook
  const resInfo = useRestaurantMenu(resId);
  console.log("Raw ResInfo from Hook:", resInfo); // Debug log

  // Loading state
  if (resInfo === null || resInfo === undefined) {
    console.log("Rendering Shimmer because resInfo is:", resInfo);
    return (
      <div className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shimmer />
        </div>
      </div>
    );
  }

  // Error state
  if (resInfo === "error") {
    return (
      <div className={`py-20 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Restaurant Not Found
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Sorry, we couldn't find this restaurant. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const infoCard = extractRestaurantInfo(resInfo.cards);
  const categories = extractCategories(resInfo.cards);
  
  // Debug logging for API data structure
  console.log("=== API DEBUG INFO ===");
  console.log("Full API Response:", resInfo);
  console.log("Cards Array:", resInfo.cards);
  console.log("Extracted Restaurant Info:", infoCard);
  console.log("Extracted Categories:", categories);
  
  // Log first category structure if available
  if (categories.length > 0) {
    console.log("First Category Structure:", categories[0]);
    if (categories[0].itemCards && categories[0].itemCards.length > 0) {
      console.log("First Item Structure:", categories[0].itemCards[0]);
      console.log("First Item Info:", categories[0].itemCards[0].card?.info);
    }
  }
  console.log("=== END API DEBUG ===");

  // Filter categories based on search and filters
  const filteredCategories = categories.map(category => {
    if (!category.itemCards) return category;
    
    const filteredItems = category.itemCards.filter(item => {
      const itemInfo = item?.card?.info;
      if (!itemInfo) return false;
      
      // Search filter
      const matchesSearch = searchTerm === "" || 
        itemInfo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemInfo.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Veg filter
      const matchesVegFilter = !showVegOnly || 
        itemInfo.itemAttribute?.vegClassifier === "VEG";
      
      return matchesSearch && matchesVegFilter;
    });

    return {
      ...category,
      itemCards: filteredItems
    };
  }).filter(category => category.itemCards && category.itemCards.length > 0);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section with Restaurant Banner */}
      <div className={`relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50'}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 animate-pulse"></div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Restaurant Information */}
          <RestaurantInfo info={infoCard} isDarkMode={isDarkMode} />
          
          {/* Restaurant Features & Offers */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className={`p-6 rounded-2xl backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-100'
                }`}>
                  <span className="text-lg">🚀</span>
                </div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Fast Delivery
                </h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Lightning fast delivery in your area with live tracking
              </p>
            </div>

            {/* Safety Features */}
            <div className={`p-6 rounded-2xl backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-green-600' : 'bg-green-100'
                }`}>
                  <span className="text-lg">🛡️</span>
                </div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Safe & Hygienic
                </h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Prepared with highest safety standards and fresh ingredients
              </p>
            </div>

            {/* Offers */}
            <div className={`p-6 rounded-2xl backdrop-blur-lg border ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-purple-600' : 'bg-purple-100'
                }`}>
                  <span className="text-lg">🎉</span>
                </div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Best Offers
                </h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Exclusive deals and discounts on your favorite meals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Header with Filters */}
        <div className={`mb-8 p-6 rounded-2xl border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            🍽️ Our Menu
          </h2>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Veg Filter */}
            <div className="flex items-center space-x-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVegOnly}
                  onChange={(e) => setShowVegOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer transition-all duration-300 ${
                  showVegOnly 
                    ? 'bg-green-600' 
                    : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300')
                } peer-focus:ring-4 peer-focus:ring-green-300`}>
                  <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 ${
                    showVegOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  🌱 Veg Only
                </span>
              </label>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full py-3 px-4 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || showVegOnly) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-xs hover:opacity-70"
                  >
                    ✕
                  </button>
                </span>
              )}
              {showVegOnly && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'
                }`}>
                  🌱 Vegetarian Only
                  <button
                    onClick={() => setShowVegOnly(false)}
                    className="ml-2 text-xs hover:opacity-70"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Categories Section */}
        <div className="mb-8">
          <RestaurantCategory 
            key="restaurant-categories" 
            categories={filteredCategories} 
            isDarkMode={isDarkMode}
            searchTerm={searchTerm}
            sortBy={sortBy}
          />
        </div>

        {/* Customer Reviews Section */}
        <div className={`p-8 rounded-3xl border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              🌟 Customer Reviews
            </h2>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${
                isDarkMode ? 'bg-yellow-600' : 'bg-yellow-100'
              }`}>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-yellow-800'
                }`}>
                  ⭐ {infoCard?.avgRatingString || "4.2"} • 1,245+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {infoCard?.avgRatingString || "4.2"}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Based on {infoCard?.totalRatingsString || "1,245+ reviews"}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-2">
                  <span className={`w-8 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {rating}⭐
                  </span>
                  <div className={`flex-1 mx-4 h-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(20, Math.random() * 80)}%` }}
                    ></div>
                  </div>
                  <span className={`w-12 text-sm text-right ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {Math.floor(Math.random() * 400) + 50}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { emoji: '🍕', title: 'Food Quality', rating: '4.5', desc: 'Fresh and delicious' },
              { emoji: '🚚', title: 'Delivery Speed', rating: '4.3', desc: 'Fast and reliable' },
              { emoji: '💰', title: 'Value for Money', rating: '4.1', desc: 'Great prices' }
            ].map((highlight, index) => (
              <div key={index} className={`p-6 rounded-2xl text-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="text-4xl mb-3">{highlight.emoji}</div>
                <h3 className={`font-bold text-lg mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {highlight.title}
                </h3>
                <div className={`text-2xl font-bold mb-1 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {highlight.rating}
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {highlight.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Reviews */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Reviews
            </h3>
            
            {[
              {
                name: 'Priya Sharma',
                rating: 5,
                time: '2 days ago',
                review: 'Amazing food quality! The biryani was absolutely delicious and arrived hot. Definitely ordering again.',
                helpful: 12,
                avatar: '👩'
              },
              {
                name: 'Rahul Kumar',
                rating: 4,
                time: '1 week ago',
                review: 'Good food and quick delivery. The packaging was excellent and kept everything fresh.',
                helpful: 8,
                avatar: '👨'
              },
              {
                name: 'Anita Verma',
                rating: 5,
                time: '2 weeks ago',
                review: 'Best restaurant in the area! Their butter chicken is to die for. Highly recommended!',
                helpful: 15,
                avatar: '👩‍🦱'
              }
            ].map((review, index) => (
              <div key={index} className={`p-6 rounded-2xl border ${
                isDarkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{review.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {review.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {review.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={`text-sm mb-3 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {review.review}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className={`flex items-center space-x-1 text-xs px-3 py-1 rounded-full transition-all hover:scale-105 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      }`}>
                        <span>👍</span>
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className={`text-xs px-3 py-1 rounded-full transition-all hover:scale-105 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                      }`}>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <div className="text-center mt-8">
            <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
            }`}>
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;