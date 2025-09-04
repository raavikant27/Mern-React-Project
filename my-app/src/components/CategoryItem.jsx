import React, { useState } from "react";
import CategoryItem from "./CategoryItem"; // Adjust path if necessary

const RestaurantCategory = ({ categories }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // State to track multiple expanded categories

  const handleCategoryClick = (index) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific category's expanded state
    }));
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        <ul>
          {/* Start of all categories loop */}
          {categories.map((category, index) => {
            const itemCount = category?.itemCards?.length || 0;
            return (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "5px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                }}
                onClick={() => handleCategoryClick(index)}
              >
                <strong>
                  {category.title || `Category ${index + 1}`} ({itemCount} items)
                </strong>
                {expandedCategories[index] && category?.itemCards && (
                  <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
                    {category.itemCards.map((item, itemIndex) => (
                      <CategoryItem
                        key={item?.card?.info?.id || `item-${itemIndex}`}
                        item={item}
                      />
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {/* End of all categories loop */}
        </ul>
      )}
    </div>
  );
};

export default RestaurantCategory;