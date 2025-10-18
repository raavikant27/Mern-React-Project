import React, { useContext } from "react";
import UserContext from "../utils/UserContext";

function RestaurantCard({ resData }) {
  if (!resData?.info) {
    console.log("resData is invalid:", resData);
    return null;
  }

  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } = resData.info;
  const deliveryTime = sla?.slaString || sla?.deliveryTime || "30-40 mins";

  // Real Swiggy API image URL handling  
  let imageUrl = "";
  
  if (cloudinaryImageId) {
    // Handle different cloudinary image ID formats
    if (cloudinaryImageId.startsWith('http')) {
      imageUrl = cloudinaryImageId;
    } else {
      // Use real Swiggy CDN with optimized parameters for restaurant cards
      imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660,h_400,c_fill/${cloudinaryImageId}`;
    }
    console.log("🏪 Using real Swiggy restaurant image:", imageUrl);
  } else {
    // Default restaurant image if no cloudinaryImageId
    imageUrl = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=660&h=400&fit=crop&auto=format";
    console.log("🏪 Using fallback restaurant image");
  }
   
  // Enhanced fallback images with Swiggy alternatives
  const fallbackImages = [
    cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300/${cloudinaryImageId}` : null,
    cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${cloudinaryImageId}` : null,
    cloudinaryImageId ? `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}` : null,
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=660&h=400&fit=crop&auto=format", // Restaurant interior
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=660&h=400&fit=crop&auto=format", // Food spread
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=660&h=400&fit=crop&auto=format", // Pizza
    "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Restaurant"
  ].filter(Boolean); // Remove null values

  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    const currentIndex = fallbackImages.findIndex(img => img === currentSrc);
    const nextIndex = currentIndex + 1;
    
    console.log(`🔄 Restaurant image failed: ${currentSrc}, trying fallback ${nextIndex}`);
    
    if (nextIndex < fallbackImages.length) {
      e.target.src = fallbackImages[nextIndex];
    }
  };
  
  const {loggedInUser}=useContext(UserContext);
  // console(loggedInUser);




  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors duration-200 shadow-md">
      <div className="relative">
        <img
          className="rounded-lg w-full h-[160px] object-cover"
          alt={name || "Restaurant Image"}
          src={imageUrl}
          onError={handleImageError}
        />
      </div>
      <h3 className="font-bold py-2 text-lg text-gray-800">{name}</h3>
      <h4 className="text-gray-600 text-sm mb-1">{cuisines?.join(", ")}</h4>
      <h4 className="text-green-600 font-semibold">⭐ {avgRating || "4.0"} Stars</h4>
      <h4 className="text-gray-700">{costForTwo}</h4>
      <h4 className="text-blue-600">🕒 {deliveryTime}</h4>
      <h4 className="text-xs text-gray-500 mt-2">👤 {loggedInUser}</h4>
    </div>
  );
}

export const withPromtedLable = (RestaurantCard) => {
  return (props) => {
    console.log("Rendering Promoted Card with props:", props); // Debug HOC
    return (
      <div>
        <label className="bg-yellow-300 text-black font-semibold p-1 rounded">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;