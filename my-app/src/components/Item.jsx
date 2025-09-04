import React, { useState, useEffect } from "react";

const Item = ({ item, isFirstItem }) => {
  const [isExpanded, setIsExpanded] = useState(isFirstItem); // Default to true for first item
  const [imageLoaded, setImageLoaded] = useState(false); // Track image load state

  const getItemPrice = (item) => {
    const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };
  const getRating = (item) => {
    return item?.card?.info?.avgRating || "N/A";
  };
  // Enhanced image URL logic with detailed logging
  const getImageUrl = (item) => {
    const imageFields = [
      item?.card?.info?.cloudinaryImageId,
      item?.card?.info?.imageId,
      item?.card?.info?.imageUrl,
      item?.card?.info?.mediaId,
      item?.card?.info?.itemAttribute?.cloudinaryImageId,
      item?.card?.info?.variations?.[0]?.cloudinaryImageId,
    ].find(field => field);
    const url = imageFields
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208/${imageFields}`
      : "https://via.placeholder.com/80";
    console.log(`Item: ${item?.card?.info?.name || "Unnamed"}, Image Fields Checked:`, {
      cloudinaryImageId: item?.card?.info?.cloudinaryImageId,
      imageId: item?.card?.info?.imageId,
      imageUrl: item?.card?.info?.imageUrl,
      mediaId: item?.card?.info?.mediaId,
      itemAttribute: item?.card?.info?.itemAttribute?.cloudinaryImageId,
      variations: item?.card?.info?.variations?.[0]?.cloudinaryImageId,
    }, `Generated URL: ${url}`);
    return url;
  };

  const handleItemClick = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle image load error
  const handleImageError = (e) => {
    setImageLoaded(false);
    e.target.src = "https://via.placeholder.com/80"; // Set fallback once
  };

  // Effect to reset imageLoaded on item change
  useEffect(() => {
    setImageLoaded(false);
  }, [item]);

  return (
    // List item for each menu item
    <li
      className="p-2 m-2 border-gray-200 border-b-2 text-left flex items-start justify-between w-full"
      onClick={handleItemClick}
    >
      <div className="w-40 p-4 flex-shrink-0 relative">
        <div className="absolute">
          <img
            src={getImageUrl(item)}
            alt={item?.card?.info?.name || "Item Image"}
            className={`w-20 h-20 object-cover rounded ${imageLoaded ? "" : "hidden"}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
          {!imageLoaded && (
            <img
              src="https://via.placeholder.com/80"
              alt="Placeholder"
              className="w-20 h-20 object-cover rounded"
            />
          )}
          <button className="p-1 bg-white shadow-lg m-auto mt-1 block text-sm">
            add+
          </button>
        </div>
        <div className="w-9/12 ml-24">
          <span className="py-1 block font-medium text-gray-900">
            {item?.card?.info?.name || "No Name"}
          </span>
          <span className="block text-gray-600 text-sm">
            ₹{getItemPrice(item) || "0.00"}
          </span>
          <span className="block text-yellow-500 text-sm">
            ★ {getRating(item)}
          </span>
        </div>
      </div>
      <span className={`transition-transform ${isExpanded ? "rotate-90" : ""} text-gray-700 font-bold text-lg ml-2 self-start`}>
        {isExpanded ? "-" : "+"}
      </span>
      {isExpanded && (
        <div className="ml-6 mt-2 w-full">
          <p className="text-sm text-gray-700">
            {item?.card?.info?.description || "No description available"}
          </p>
        </div>
      )}
    </li>
  );
};

export default Item;