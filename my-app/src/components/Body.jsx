import React from "react";
import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData"; // Adjust path if needed
import ErrorBoundary from "./ErrorBoundary";

function Body() {
  console.log("resObj:", resObj); // Debug the imported data
  const restaurants = resObj[0]?.card?.gridElements?.infoWithStyle?.restaurants || [];
  console.log("restaurants:", restaurants); // Debug the extracted array

  return (
    <ErrorBoundary>
      <div className="res-container"> {/* Using res-container for flex layout */}
        {restaurants.map((restaurant) => {
          console.log("restaurant:", restaurant); // Debug each restaurant object
          if (!restaurant?.info?.id) return null; // Skip invalid restaurants
          return <RestaurantCard key={restaurant.info.id} resData={restaurant} />;
        })}
      </div>
    </ErrorBoundary>
  );
}

export default Body;