import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/contants";

function RestaurantMenu() {
  const [resInfo, setResInfo] = useState(null);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [error, setError] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const json = await response.json();
      console.log("Fetched API JSON:", json);
      if (!json.data) {
        throw new Error("No data found in API response");
      }
      setResInfo(json.data);
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setResInfo(null);
    }
  };

  // Error UI
  if (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>Error</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Loader
  if (resInfo === null) {
    return <Shimmer />;
  }

  // Extract restaurant info
  const infoCard =
    resInfo?.cards?.find(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    )?.card?.card?.info || {};

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    sla,
  } = infoCard;

  // Extract all menu items
  const getAllItems = (cards) => {
    if (!cards) return [];
    return cards.flatMap((c) => {
      const cardContent = c?.card?.card;
      if (cardContent?.itemCards) return cardContent.itemCards;
      if (cardContent?.categories) return getAllItems(cardContent.categories);
      return [];
    });
  };

  const menuCard = resInfo?.cards?.find((c) => c.groupedCard);
  const regularCards =
    menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  let itemCards = getAllItems(regularCards);

  if (itemCards.length === 0) {
    itemCards =
      resInfo?.menu?.items ||
      resInfo?.items ||
      resInfo?.data?.itemCards ||
      [];
  }

  // Filter Veg / All
  const filteredItems = showVegOnly
    ? itemCards.filter((item) => item?.card?.info?.isVeg === 1)
    : itemCards;

  // Price calculation
  const getItemPrice = (item) => {
    const price =
      item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>{name || "Restaurant Name Not Available"}</h1>
      <h2>{cuisines ? cuisines.join(", ") : "Cuisine Not Available"}</h2>
      <h3>{costForTwoMessage || "Cost Not Available"}</h3>
      <h3>
        Rating: {avgRatingString || "N/A"} ({totalRatingsString || "No ratings"})
      </h3>
      <h3>Delivery Time: {sla?.slaString || "N/A"}</h3>

      {/* Veg Toggle */}
      <div style={{ margin: "10px 0" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: showVegOnly ? "#28a745" : "#f8f9fa",
            color: showVegOnly ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setShowVegOnly(!showVegOnly)}
        >
          {showVegOnly ? "Show All Items" : "Veg Only"}
        </button>
      </div>

      {/* Menu Items */}
      <h2>Menu</h2>
      {filteredItems.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={item?.card?.info?.id || `item-${index}`}>
              <strong>{item?.card?.info?.name}</strong> - ₹{getItemPrice(item)}
              {item?.card?.info?.isVeg === 1 && (
                <span style={{ color: "green", marginLeft: "10px" }}>🟢 Veg</span>
              )}
              {item?.card?.info?.description && (
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {item.card.info.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantMenu;
