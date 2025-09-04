import React, { useState } from "react";

const Item = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle item expansion
  const getItemPrice = (item) => {
    const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };

  const handleItemClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    // List item for each menu item
    <li
      className="mb-4 cursor-pointer p-4 bg-white shadow-md rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out"
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-between text-base font-semibold text-gray-900">
        <div>
          <strong>{item?.card?.info?.name}</strong> - ₹{getItemPrice(item)}
          {item?.card?.info?.isVeg === 1 && (
            <span className="text-green-700 ml-3">🟢 Veg</span>
          )}
        </div>
        <span className={`transition-transform ${isExpanded ? "rotate-90" : ""} text-gray-700 font-bold`}>
          {isExpanded ? "-" : "+"}
        </span>
      </div>
      {isExpanded && (
        <div className="ml-6 mt-3">
          <div className="text-sm text-gray-700">
            {item?.card?.info?.description && item.card.info.description}
          </div>   
        </div>   
      )}
    </li>
  );
};

export default Item;