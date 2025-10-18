import React, { useContext, useEffect, useState } from "react";
import RestaurantCard, { withPromtedLable } from "./RestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlinestatus from "../utils/useOnlinestatus";
import UserContext from "../utils/UserContext";
import { resObj } from "../utils/mockData";
import { RESTAURANTS_API, BACKUP_RESTAURANTS_API } from "../utils/contants";

function Body({ isDarkMode }) {
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
    
    // Fallback: Load mock data after 2 seconds if no data loaded
    const fallbackTimer = setTimeout(() => {
      if (listOfRestaurants.length === 0) {
        console.log("No data loaded after 2 seconds, loading mock data");
        loadMockData();
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Add a button to load mock data for testing
  const loadMockData = () => {
    console.log("Loading mock data manually");
    const mockRestaurants = resObj[0]?.card?.gridElements?.infoWithStyle?.restaurants || [];
    console.log("Mock restaurants loaded:", mockRestaurants.length);
    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
  };

  const fetchData = async () => {
    const APIs = [
      RESTAURANTS_API,
      BACKUP_RESTAURANTS_API
    ];

    for (let i = 0; i < APIs.length; i++) {
      try {
        console.log(`Trying API ${i + 1}: ${APIs[i]}`);
        const response = await fetch(APIs[i]);

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          console.log(`API ${i + 1} failed, trying next...`);
          continue;
        }

        const json = await response.json();
        console.log("API Response:", json);

        let fetchedRestaurants = [];
        
        // Try different response structures
        if (json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          fetchedRestaurants = json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
        } else if (json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          fetchedRestaurants = json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
        } else if (json?.data?.cards) {
          // Search for restaurants in any card
          for (const card of json.data.cards) {
            const restaurants = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if (restaurants && restaurants.length > 0) {
              fetchedRestaurants = restaurants;
              break;
            }
          }
        }

        console.log("Fetched restaurants:", fetchedRestaurants);
        console.log("Number of restaurants:", fetchedRestaurants.length);

        if (fetchedRestaurants.length > 0) {
          setRestaurants(fetchedRestaurants);
          setFilteredRestaurants(fetchedRestaurants);
          return; // Success, exit the loop
        }
      } catch (error) {
        console.error(`Error with API ${i + 1}:`, error);
        continue;
      }
    }

    // If all APIs fail, use mock data
    console.log("All APIs failed, using mock data");
    const mockRestaurants = resObj[0]?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
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
      <div className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            🍽️ Find Your Favorite Restaurant
          </h2>
          
          {/* Search and Filter Section */}
          <div className={`p-6 rounded-2xl mb-8 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="relative flex-1 min-w-64">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                <input
                  type="text"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Search for restaurants, cuisines..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              
              <button
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25"
                onClick={handleSearch}
              >
                <span className="flex items-center">
                  <span className="mr-2">🔍</span>
                  Search
                </span>
              </button>
              
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } shadow-lg hover:shadow-blue-500/25`}
                onClick={filterTopRated}
              >
                <span className="flex items-center">
                  <span className="mr-2">⭐</span>
                  Top Rated
                </span>
              </button>
              
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isDarkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                } shadow-lg hover:shadow-green-500/25`}
                onClick={loadMockData}
              >
                <span className="flex items-center">
                  <span className="mr-2">📊</span>
                  Load Test Data
                </span>
              </button>
            </div>
            
            {/* Username Input */}
            <div className="flex items-center gap-3">
              <label className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                👤 Username:
              </label>
              <input
                className={`px-4 py-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
              />
            </div>
          </div>

          {/* Restaurant Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.length === 0 ? (
              <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                <p>Try searching with different keywords or load test data</p>
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
                    className="transform transition-all duration-200 hover:scale-105"
                  >
                    {isPromoted ? (
                      <RestaurantCardPromoted resData={restaurant} isDarkMode={isDarkMode} />
                    ) : (
                      <RestaurantCard resData={restaurant} isDarkMode={isDarkMode} />
                    )}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Body;