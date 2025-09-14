import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
// Import the Item component to display individual menu items
import Item from "./Item";

// Main component to display a list of restaurant categories
const RestaurantCategory = ({ categories, isDarkMode }) => {
  // Step 1: Create a state to keep track of the index of the currently expanded category
  // Use null to indicate no category is expanded
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState(null);
  
  // Use ref to maintain state across re-renders
  const accordionStateRef = useRef(null);
  
  // Initialize accordion state from ref if available
  useEffect(() => {
    if (accordionStateRef.current !== null) {
      setExpandedCategoryIndex(accordionStateRef.current);
    }
  }, []);
  
  // Update ref whenever state changes
  useEffect(() => {
    accordionStateRef.current = expandedCategoryIndex;
  }, [expandedCategoryIndex]);

  // Step 2: Function to handle clicking on a category to expand or collapse it
  // The 'categoryIndex' parameter tells us which category was clicked
  const handleCategoryClick = useCallback((categoryIndex) => {
    // Step 3: Update the state to either expand the clicked category or collapse all
    // If the clicked category is already open, collapse it; otherwise, open it and close others
    setExpandedCategoryIndex((currentIndex) =>
      currentIndex === categoryIndex ? null : categoryIndex
    );
  }, []);

  // Step 4: Render the category list section
  return (
    // Container div with responsive width (half the screen), margin, shadow, padding, and border
    // The background and text color change based on the isDarkMode prop
    <div
      className={`w-6/12 mx-auto my-6 bg-white shadow-xl p-6 rounded-lg border border-gray-200 pt-24 ${
        isDarkMode
          ? 'bg-gray-800 text-gray-300 border-gray-700'
          : 'bg-white text-gray-800 border-gray-200'
      }`}
    >
      {/* Heading for the category section */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>

      {/* Step 5: Check if there are any categories to display */}
      {categories.length === 0 ? (
        // Show a message if no categories are available
        <p className="text-gray-600">No categories available.</p>
      ) : (
        // Step 6: If categories exist, create an unordered list to display them nd it controlled by parents thatss why it is controll components 
        <ul>
          {useMemo(() => 
            categories.map((category, index) => {
              // Count the number of items in the current category, default to 0 if undefined
              const numberOfItems = category?.itemCards?.length || 0;
              // Check if the current category is expanded based on its index
              const isCategoryExpanded = expandedCategoryIndex === index;

            return (
              // Step 7: Create a list item for each category
              <li
                key={index} // Unique key for React to track this list item
                className={`mb-4 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryClick(index)} // Trigger expansion/collapse on click
              >
                {/* Step 8: Display category title and item count in a flex layout */}
                <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                  <span>
                    {/* Show the category title or a default name if not available */}
                    {category.title || `Category ${index + 1}`} ({numberOfItems} items)
                  </span>
                  {/* Show a plus or minus sign to indicate expand/collapse state */}
                  <span
                    className={`transition-transform ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } ${isCategoryExpanded ? "rotate-90" : ""}`}
                  >
                    {isCategoryExpanded ? "-" : "+"}
                  </span>
                </div>

                {/* Step 9: If the category is expanded, show the list of items */}
                {isCategoryExpanded && category?.itemCards && (
                  <ul className="ml-5 mt-2">
                    {category.itemCards.map((menuItem, itemIndex) => (
                      // Render each item using the Item component
                      <Item
                        key={menuItem?.card?.info?.id || `item-${itemIndex}`} // Unique key for each item
                        item={menuItem} // Pass the item data
                        isFirstItem={itemIndex === 0} // Mark the first item for special styling if needed
                        isDarkMode={isDarkMode} // Pass dark mode state to Item component
                      />
                    ))}
                  </ul>
                )}
              </li>
            );
          }), [categories, expandedCategoryIndex, isDarkMode, handleCategoryClick])}
        </ul>
      )}
    </div>
  );
};

// Export the component so it can be used in other files
export default RestaurantCategory;
//liefting stateup the react