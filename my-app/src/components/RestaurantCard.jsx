import React from "react";

function RestaurantCard({ resData }) {
  if (!resData?.info) {
    console.log("resData is invalid:", resData);
    return null;
  }

  const { name, cuisines, avgRating, costForTwo, deliveryTime, cloudinaryImageId } = resData.info;

  let imageUrl = "";
  if (cloudinaryImageId) {
    if (!cloudinaryImageId.includes("/")) {
      imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryImageId}`;
    } else {
      imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryImageId}`;
    }
  }

  const fallbackImage = "https://via.placeholder.com/190x120?text=No+Image";

  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-50 hover:bg-gray-400">
      <img
        className="rounded-lg"
        alt={name || "Restaurant Image"}
        src={imageUrl || fallbackImage}
        onError={(e) => { e.target.src = fallbackImage; }}
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime}</h4>
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