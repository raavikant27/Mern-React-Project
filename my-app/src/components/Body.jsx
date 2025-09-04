import React, { useEffect, useState } from "react";
import RestaurantCard, { withPromtedLable } from "./RestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlinestatus from "../utils/useOnlinestatus";

function Body() {
  const [listOfRestaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLable(RestaurantCard);

  const filterTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info?.avgRating > 4.3
    );
    setFilteredRestaurants(filtered);
  };

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
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
      setFilteredRestaurants(fetchedRestaurants);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const onlinestatus = useOnlinestatus();
  if (onlinestatus === false) return <h1>Looks like you're offline</h1>;

  if (listOfRestaurants.length === 0 && filteredRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <ErrorBoundary>
      <div className="body p-4">
        <h2 className="text-2xl font-semibold mb-4">Find Your Favorite Restaurant</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            className="w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter restaurant name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-400 m-4 text-white rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={filterTopRated}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex flex-wrap">
          {filteredRestaurants.map((restaurant) => {
            if (!restaurant?.info?.id) return null;
            return (
              <Link
                key={restaurant.info.id}
                to={`/restaurants/${restaurant.info.id}`}
              >
                {restaurant.info.promoted ? (
                  <RestaurantCardPromoted resData={restaurant} />
                ) : (
                  <RestaurantCard resData={restaurant} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Body;