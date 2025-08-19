import React from "react";

function RestaurantCard({ resData }) {
  // Null check for resData.info
  if (!resData?.info) {
    console.log("resData is invalid:", resData); // Debug invalid data
    return null;
  }

  const { name, cuisines, avgRating, cloudinaryImageId } = resData.info;

  // Handle cloudinaryImageId to construct the correct URL
  let imageUrl = "";
  if (cloudinaryImageId) {
    // For simple IDs (e.g., "e0839ff574213e6f35b3899ebf1fc597")
    if (!cloudinaryImageId.includes("/")) {
      imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryImageId}`;
    } else {
      // For RX_THUMBNAIL paths, use the full path with transformations
      imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryImageId}`;
    }
  }

  // Fallback image if URL fails
  const fallbackImage = "https://via.placeholder.com/190x120?text=No+Image";

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt={name || "Restaurant Image"}
        src={imageUrl || fallbackImage} // Use fallback if imageUrl is empty
        onError={(e) => { e.target.src = fallbackImage; }} // Fallback on load error
        width="200"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{cloudinaryImageId}</h4>
    </div>
  );
}

export default RestaurantCard;