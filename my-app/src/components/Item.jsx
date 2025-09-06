import React, { useState, useEffect } from "react";

const Item = ({ item }) => {
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
    // List item with all content in a single line
    <li
      className="p-4 m-4 border-b-2 border-gray-600 text-left flex items-center justify-between w-full"
    >
      <div className="flex items-center w-full">
        <div className="w-48 p-4 flex-shrink-0 relative"> {/* Increased w-40 to w-48 to accommodate larger image */}
          <div className="relative">
            <img
              src={getImageUrl(item)}
              alt={item?.card?.info?.name || "Item Image"}
              className={`w-28 h-28 object-cover rounded ${imageLoaded ? "" : "hidden"}`} // Increased w-20 h-20 to w-28 h-28
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
            {!imageLoaded && (
              <img
                src="https://via.placeholder.com/80"
                alt="Placeholder"
                className="w-28 h-28 object-cover rounded" // Updated fallback size
              />
            )}
            <button className="absolute top-0 right-0 p-1 bg-white shadow-lg m-1 text-sm rounded">
              add+
            </button>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <span className="py-1 block font-medium text-gray-900">
            {item?.card?.info?.name || "No Name"}
          </span>
          <span className="block text-gray-600 text-sm">
            ₹{getItemPrice(item) || "0.00"}
          </span>
          <span className="block text-yellow-500 text-sm">
            ★ {getRating(item)}
          </span>
          <p className="text-sm text-gray-700 inline-block ml-4">
            {item?.card?.info?.description || "No description available"}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Item;