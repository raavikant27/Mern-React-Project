import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData"; // Adjust path if needed
import ErrorBoundary from "./ErrorBoundary";

function Body() {
  const [restaurants, setRestaurants] = useState(
    resObj[0]?.card?.gridElements?.infoWithStyle?.restaurants || []
  );

  console.log("resObj:", resObj);
  console.log("restaurants:", restaurants);

  const filterTopRated = () => {
    const filteredRestaurants = restaurants.filter(
      (res) => res.info.avgRating > 4.8
    );
    console.log("filtered restaurants:", filteredRestaurants);
    setRestaurants(filteredRestaurants);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.9352403&lng=77.624532&carousel=true&third_party_vendor=1"
      );

      if (!response.ok) {
        console.log("API request failed with status:", response.status);
        return; // Exit if the response is not OK (e.g., 404)
      }

      const json = await response.json();
      console.log(json);
      setRestaurants(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
); // Adjusted to use json.data.cards
    } catch (error) {
      console.log("Fetch error:", error);
    }
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
            console.log("restaurant:", restaurant);
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