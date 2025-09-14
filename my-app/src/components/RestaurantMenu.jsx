import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { SiPanasonic } from "react-icons/si";
import RestaurantCategory from "./RestaurantCategory"; // Import new component
import Item from "./Item";

// Component to display restaurant information
const RestaurantInfo = ({ info, isDarkMode }) => {
  // Helper function to get restaurant image
  const getRestaurantImage = (info) => {
    const imageFields = [
      info?.cloudinaryImageId,
      info?.imageId,
      info?.imageUrl,
    ].find(field => field);
    
    return imageFields
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024,h_768/${imageFields}`
      : "https://via.placeholder.com/800x400?text=Restaurant+Image";
  };

  return (
    <div className={`bg-white ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden mb-8`}>
      {/* Restaurant Image */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
        <img
          src={getRestaurantImage(info)}
          alt={info?.name || "Restaurant Image"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x400?text=Restaurant+Image";
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Restaurant Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
            {info?.name || "Restaurant Name Not Available"}
          </h1>
          <p className={`text-sm sm:text-base text-gray-200 ${isDarkMode ? 'text-gray-200' : 'text-gray-200'}`}>
            {info?.cuisines ? info.cuisines.join(", ") : "Cuisine Not Available"}
          </p>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Rating Card */}
          <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center justify-center mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-green-100'}`}>
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <h3 className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-green-800'}`}>
              {info?.avgRatingString || "N/A"}
            </h3>
            <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-green-600'}`}>
              {info?.totalRatingsString || "No ratings"}
            </p>
          </div>

          {/* Delivery Time Card */}
          <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center justify-center mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-blue-100'}`}>
                <span className="text-2xl">⏰</span>
              </div>
            </div>
            <h3 className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
              {info?.sla?.slaString || "N/A"}
            </h3>
            <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-blue-600'}`}>
              Delivery Time
            </p>
          </div>

          {/* Cost Card */}
          <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'}`}>
            <div className="flex items-center justify-center mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-purple-100'}`}>
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <h3 className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-purple-800'}`}>
              {info?.costForTwoMessage || "N/A"}
            </h3>
            <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-purple-600'}`}>
              Cost for Two
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {(info?.areaName || info?.city) && (
          <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-center space-x-4 text-sm">
              {info?.areaName && (
                <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="mr-2">📍</span>
                  {info.areaName}
                </span>
              )}
              {info?.city && (
                <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="mr-2">🏙️</span>
                  {info.city}
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
  const [error, setError] = useState(null);
  const { resId } = useParams();

  // Fetch restaurant menu data using custom hook
  const resInfo = useRestaurantMenu(resId);
  console.log("Raw ResInfo from Hook:", resInfo); // Debug log

  // Loading state
  if (resInfo === null || resInfo === undefined) {
    console.log("Rendering Shimmer because resInfo is:", resInfo);
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Shimmer />
        </div>
      </div>
    );
  }

  // Error state
  if (resInfo === "error") {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-900'}`}>
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Information */}
        <RestaurantInfo info={infoCard} isDarkMode={isDarkMode} />
        
        {/* Categories Section */}
        <div className="mb-8">
          <RestaurantCategory key="restaurant-categories" categories={categories} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;