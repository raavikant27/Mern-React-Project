import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import Shimmer from "./Shimmer";
// import "./Body.css"; // CSS file
import { Link } from "react-router-dom";

function Body() {
  const [listOfRestaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // ⭐ Top Rated Filter
  const filterTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info?.avgRating > 4.3
    );
    setFilteredRestaurants(filtered);
  };

  // 🔍 Search Function
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  // 📡 Fetch API
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

  // ⏳ Shimmer Loader
  if (listOfRestaurants.length === 0 && filteredRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <ErrorBoundary>
      <div className="body">
        {/* 🔍 Search Section */}
        <section className="search-section">
          <h2 className="search-heading">Find Your Favorite Restaurant</h2>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Enter restaurant name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </section>

        {/* ⭐ Filter Section */}
        <div className="filter">
          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated Restaurant
          </button>
        </div>

        {/* 🍴 Restaurant Cards */}
        <div className="res-container">
          {filteredRestaurants.map((restaurant) => {
            if (!restaurant?.info?.id) return null;
            return (
              <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
                <RestaurantCard resData={restaurant} />
              </Link>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Body;
