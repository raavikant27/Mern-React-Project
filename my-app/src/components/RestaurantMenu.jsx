import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { SiPanasonic } from "react-icons/si";
import Item from "./Item"; // Import the new Item component

// Reusable Components
const RestaurantInfo = ({ info }) => (
  <div className="text-center">
    <h1 className="font-bold my-6 text-2xl">{info.name || "Restaurant Name Not Available"}</h1>
    <h2 className="font-bold text-lg">{info.cuisines ? info.cuisines.join(", ") : "Cuisine Not Available"}</h2>
    <h3>{info.costForTwoMessage || "Cost Not Available"}</h3>
    <h3>
      Rating: {info.avgRatingString || "N/A"} ({info.totalRatingsString || "No ratings"})
    </h3>
    <h3>Delivery Time: {info.sla?.slaString || "N/A"}</h3>
  </div>
);

const CategoryList = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // State to track multiple expanded categories

  const handleCategoryClick = (index) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific category's expanded state
    }));
  };

  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <ul>
          {/* Start of all categories loop */}
          {categories.map((category, index) => {
            const itemCount = category?.itemCards?.length || 0;
            const isExpanded = expandedCategories[index];
            return (
              <li
                key={index}
                className="mb-4 text-lg cursor-pointer p-2 bg-gray-200 rounded flex items-center justify-between"
                onClick={() => handleCategoryClick(index)}
              >
                <span className="font-medium text-lg">
                  {category.title || `Category ${index + 1}`} ({itemCount} items)
                </span>
                <span className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                  {isExpanded ? "-" : "+"}
                </span>
                {expandedCategories[index] && category?.itemCards && (
                  <ul className="ml-5 mt-2">
                    {category.itemCards.map((item, itemIndex) => (
                      <Item
                        key={item?.card?.info?.id || `item-${itemIndex}`}
                        item={item}
                      />
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {/* End of all categories loop */}
        </ul>
      )}
    </div>
  );
};

// Utility Functions
const extractRestaurantInfo = (cards) => {
  return (
    cards?.find(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    )?.card?.card?.info || {}
  );
};

const extractCategories = (cards) => {
  if (!cards) return [];
  const menuCard = cards.find((c) => c.groupedCard);
  const regularCards = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  return regularCards
    .filter((card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    .map((card) => card.card.card);
};

function RestaurantMenu() {
  const [showVegOnly, setShowVegOnly] = useState(false); // Kept for potential future use
  const [error, setError] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  console.log("Raw ResInfo from Hook:", resInfo); // Log raw data

  // Loader
  if (resInfo === null) {
    return <Shimmer />;
  }

  // Extract data
  const infoCard = extractRestaurantInfo(resInfo.cards);
  const categories = extractCategories(resInfo.cards);
  console.log("Extracted Categories:", categories); // Log categories

  return (
    <div className="p-5 font-sans">
      <RestaurantInfo info={infoCard} />
      <CategoryList categories={categories} />
    </div>
  );
}

export default RestaurantMenu;