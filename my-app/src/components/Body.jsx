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

  console.log("Body Rendered", listOfRestaurants); // Debug initial render

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
        setRestaurants([]); // Set to empty array on failure
        setFilteredRestaurants([]);
        return;
      }

      const json = await response.json();
      console.log("Fetched API JSON:", json); // Debug full response

      const fetchedRestaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      fetchedRestaurants.forEach((restaurant) => {
        console.log("Restaurant Info:", restaurant.info);
      });

      setRestaurants(fetchedRestaurants);
      setFilteredRestaurants(fetchedRestaurants);
    } catch (error) {
      console.log("Fetch error:", error);
      setRestaurants([]); // Set to empty array on error
      setFilteredRestaurants([]);
    }
  };

  const onlinestatus = useOnlinestatus();
  if (onlinestatus === false) return <h1>Looks like you're offline</h1>;

  // Enhanced condition to show shimmer during loading
  if (listOfRestaurants.length === 0) {
    console.log("Rendering Shimmer because listOfRestaurants is empty");
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
            console.log("Restaurant Data:", restaurant.info);
            const isPromoted = restaurant.info.promoted || false;
            return (
              <Link
                key={restaurant.info.id}
                to={`/restaurants/${restaurant.info.id}`}
              >
                {isPromoted ? (
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