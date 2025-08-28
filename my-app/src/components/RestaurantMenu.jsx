import React, { useEffect, useState } from 'react';
import Shimmer from './Shimmer';

function RestaurantMenu() {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=1087169&submitAction=ENTER"
      );

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

  return (
    <div className="menu" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{name || "Restaurant Name Not Available"}</h1>
      <h2>{cuisines ? cuisines.join(", ") : "Cuisine Not Available"}</h2>
      <h3>{costForTwoMessage || "Cost Not Available"}</h3>
      <h3>Rating: {avgRatingString || "N/A"} ({totalRatingsString || "No ratings"})</h3>
      <h3>Delivery Time: {sla?.slaString || "N/A"}</h3>
      <h2>Menu</h2>
      <ul>
        {itemCards.length > 0 ? (
          itemCards.map((item) => (
            <li key={item.card.info.id}>
              {item.card.info.name} - ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))
        ) : (
          <li>No menu items available</li>
        )}
      </ul>
    </div>
  );
}

export default RestaurantMenu;