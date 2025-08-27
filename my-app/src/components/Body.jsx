import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData"; // Adjust path if needed
import ErrorBoundary from "./ErrorBoundary";

function Body() {
  // Initialize state with the restaurant list from mockData
  const [restaurants, setRestaurants] = useState(
    resObj[0]?.card?.gridElements?.infoWithStyle?.restaurants || []
  );

  console.log("resObj:", resObj); // Debug the imported data
  console.log("restaurants:", restaurants); // Debug the state

  // Function to filter restaurants with avgRating > 4
  const filterTopRated = () => {
    const filteredRestaurants = restaurants.filter(
      (res) => res.info.avgRating > 4.8
    );
    console.log("filtered restaurants:", filteredRestaurants);
    setRestaurants(filteredRestaurants); // Update state to trigger re-render
  };

  return (
    <ErrorBoundary>
      <div className="body">
        <div className="filter">
          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated Restaurant
          </button>
        </div>
        <div className="res-container">
          {restaurants.map((restaurant) => {
            console.log("restaurant:", restaurant); // Debug each restaurant object
            if (!restaurant?.info?.id) return null; // Skip invalid restaurants
            return (
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Body;