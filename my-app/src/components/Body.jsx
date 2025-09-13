import React, { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromtedLable } from "./RestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlinestatus from "../utils/useOnlinestatus";
import UserContext from "../utils/UserContext";

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
        setRestaurants([]);
        setFilteredRestaurants([]);
        return;
      }

      const json = await response.json();

      const fetchedRestaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setRestaurants(fetchedRestaurants);
      setFilteredRestaurants(fetchedRestaurants);
    } catch (error) {
      setRestaurants([]);
      setFilteredRestaurants([]);
    }
  };

  const onlinestatus = useOnlinestatus();
  if (onlinestatus === false) return <h1>Looks like you're offline</h1>;

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  const userContext = useContext(UserContext);
  const loggedInUser = userContext.loggedInUser;
  const setUserName = userContext.setUserName || (() => {});

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
          <label className="ml-4">Username:</label>
          <input
            className="border border-black p-2 ml-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap">
          {filteredRestaurants.length === 0 ? (
            <div className="w-full text-center text-gray-500 text-lg py-8">
              No restaurants found.
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => {
              if (!restaurant?.info?.id) return null;
              // Check if restaurant is promoted
              const isPromoted = restaurant.info.promoted === true;
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
            })
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Body;