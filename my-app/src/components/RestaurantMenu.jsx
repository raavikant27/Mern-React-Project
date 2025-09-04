import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { SiPanasonic } from "react-icons/si";
import Item from "./Item";

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
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-6/12 mx-auto my-6 bg-white shadow-xl p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
      {categories.length === 0 ? (
        <p className="text-gray-600">No categories available.</p>
      ) : (
        <ul>
          {categories.map((category, index) => {
            const itemCount = category?.itemCards?.length || 0;
            const isExpanded = expandedCategories[index];
            return (
              <li
                key={index}
                className="mb-4 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                onClick={() => handleCategoryClick(index)}
              >
                <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                  <span>
                    {category.title || `Category ${index + 1}`} ({itemCount} items)
                  </span>
                  <span className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}>
                    {isExpanded ? "-" : "+"}
                  </span>
                </div>
                {isExpanded && category?.itemCards && (
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
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  console.log("Raw ResInfo from Hook:", resInfo);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const infoCard = extractRestaurantInfo(resInfo.cards);
  const categories = extractCategories(resInfo.cards);
  console.log("Extracted Categories:", categories);

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <RestaurantInfo info={infoCard} />
      <CategoryList categories={categories} />
    </div>
  );
}

export default RestaurantMenu;