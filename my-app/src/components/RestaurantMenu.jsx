import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { SiPanasonic } from "react-icons/si";
import RestaurantCategory from "./RestaurantCategory"; // Import new component
import Item from "./Item";

// Component to display restaurant information
const RestaurantInfo = ({ info }) => (
  <div className="text-center">
    {/* Display restaurant name with fallback */}
    <h1 className="font-bold my-6 text-2xl">{info.name || "Restaurant Name Not Available"}</h1>
    {/* Display cuisines with fallback, joining array into a string */}
    <h2 className="font-bold text-lg">{info.cuisines ? info.cuisines.join(", ") : "Cuisine Not Available"}</h2>
    {/* Display cost for two with fallback */}
    <h3>{info.costForTwoMessage || "Cost Not Available"}</h3>
    {/* Display rating and total ratings with fallback */}
    <h3>
      Rating: {info.avgRatingString || "N/A"} ({info.totalRatingsString || "No ratings"})
    </h3>
    {/* Display delivery time with fallback */}
    <h3>Delivery Time: {info.sla?.slaString || "N/A"}</h3>
  </div>
);

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

  if (resInfo === null || resInfo === undefined) { // Check for loading state
    console.log("Rendering Shimmer because resInfo is:", resInfo); // Debug log
    return <Shimmer />;
  }

  const infoCard = extractRestaurantInfo(resInfo.cards);
  const categories = extractCategories(resInfo.cards);
  console.log("Extracted Categories:", categories);

  return (
    <div className={`p-6 font-sans min-h-screen pt-32 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-900'}`}>
      <RestaurantInfo info={infoCard} />
      <RestaurantCategory categories={categories} isDarkMode={isDarkMode} /> {/* Use new component */}
    </div>
  );
}

export default RestaurantMenu;