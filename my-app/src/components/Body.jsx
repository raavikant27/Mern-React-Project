import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import Shimmer from "./Shimmer";

function Body() {
  const [listOfRestaurants, setRestaurants] = useState([]); // original full list
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // display list

  const filterTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info?.avgRating > 4.3
    );
    setFilteredRestaurants(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://foodfire.onrender.com/api/restaurants?lat=12.9352403&lng=77.624532&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        console.log("API request failed with status:", response.status);
        return;
      }

      const json = await response.json();
      console.log("Fetched API JSON:", json);

      const fetchedRestaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setRestaurants(fetchedRestaurants);
      setFilteredRestaurants(fetchedRestaurants); // show same initially
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // Show Shimmer until data is fetched
  //conditional radering 
  if (listOfRestaurants.length === 0 && filteredRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <ErrorBoundary>
      <div className="body">
        <div className="filter">
          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated Restaurant
          </button>
        </div>
        <div className="res-container">
          {filteredRestaurants.map((restaurant) => {
            if (!restaurant?.info?.id) return null;
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