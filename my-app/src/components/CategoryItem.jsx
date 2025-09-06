import React from "react";

const CategoryItem = ({ item }) => {
  const getItemPrice = (item) => {
    const price = item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return (price / 100).toFixed(2);
  };

  return (
    <li style={{ marginBottom: "5px" }}>
      <strong>{item?.card?.info?.name}</strong> - ₹{getItemPrice(item)}
      {item?.card?.info?.isVeg === 1 && (
        <span style={{ color: "green", marginLeft: "10px" }}>🟢 Veg</span>
      )}
      {item?.card?.info?.description && (
        <p style={{ fontSize: "14px", color: "#666" }}>
          {item.card.info.description}
        </p>
      )}
    </li>
  );
};

export default CategoryItem;