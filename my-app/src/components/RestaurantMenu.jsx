import React, { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/contants';
function RestaurantMenu() {
  const [resInfo, setResInfo] = useState(null);
  const [showVegOnly, setShowVegOnly] = useState(false);

  const{resId}=useParams();









  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API +resId);

      if (!data.ok) {
        console.log("API request failed with status:", data.status);
        return;
      }

      const json = await data.json();
      console.log("Fetched API JSON:", json);
      setResInfo(json.data); // Set the data object directly
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // Render Shimmer while loading
  if (resInfo === null) return <Shimmer />;

  // Destructure the restaurant info from the correct path
  const { name, cuisines, costForTwoMessage, avgRatingString, totalRatingsString, sla } =
    resInfo?.cards[2]?.card?.card?.info || {};

  // Destructure itemCards for menu items
  const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards || [];

  // Filter items based on veg-only toggle
  const filteredItems = showVegOnly
    ? itemCards.filter((item) => item.card.info.isVeg === 1)
    : itemCards;

  return (
    <div className="menu" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{name || "Restaurant Name Not Available"}</h1>
      <h2>{cuisines ? cuisines.join(", ") : "Cuisine Not Available"}</h2>
      <h3>{costForTwoMessage || "Cost Not Available"}</h3>
      <h3>Rating: {avgRatingString || "N/A"} ({totalRatingsString || "No ratings"})</h3>
      <h3>Delivery Time: {sla?.slaString || "N/A"}</h3>
      <div style={{ margin: '10px 0' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: showVegOnly ? '#28a745' : '#f8f9fa',
            color: showVegOnly ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setShowVegOnly(!showVegOnly)}
        >
          {showVegOnly ? 'Show All Items' : 'Veg Only'}
        </button>
      </div>
      <h2>Menu</h2>
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
              {item.card.info.isVeg === 1 && (
                <span style={{ color: 'green', marginLeft: '10px' }}>🟢 Veg</span>
              )}
            </li>
          ))
        ) : (
          <li>No {showVegOnly ? 'vegetarian' : 'menu'} items available</li>
        )}
      </ul>
    </div>
  );
}

export default RestaurantMenu;