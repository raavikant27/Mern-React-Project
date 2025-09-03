import React from "react";

function RestaurantCard({ resData }) {
  // Null check for resData.info
  if (!resData?.info) {
    console.log("resData is invalid:", resData); // Debug invalid data
    return null;
  }

  const { name, cuisines, avgRating, costForTwo,deliveryTime,cloudinaryImageId } = resData.info;

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
    <div className=" m-4 p-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-400">
      <img
        className="rounded-lg"
        alt={name || "Restaurant Image"}
        src={imageUrl || fallbackImage} // Use fallback if imageUrl is empty
        onError={(e) => { e.target.src = fallbackImage; }} // Fallback on load error
        
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime}</h4>
      {/* <h4>{cloudinaryImageId}</h4> */}
    </div>
  );
}

export default RestaurantCard;