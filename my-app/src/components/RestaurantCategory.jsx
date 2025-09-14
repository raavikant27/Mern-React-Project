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
    // Container div with responsive width, margin, shadow, padding, and border
    // The background and text color change based on the isDarkMode prop
    <div className="w-full max-w-6xl mx-auto">
      {/* Step 5: Check if there are any categories to display */}
      {categories.length === 0 ? (
        // Show a message if no categories are available
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-lg">No categories available.</p>
        </div>
      ) : (
        // Step 6: If categories exist, create a grid layout for better visual appeal
        <div className="space-y-4">
          {useMemo(() => 
            categories.map((category, index) => {
              // Count the number of items in the current category, default to 0 if undefined
              const numberOfItems = category?.itemCards?.length || 0;
              // Check if the current category is expanded based on its index
              const isCategoryExpanded = expandedCategoryIndex === index;

            return (
              // Step 7: Create a category card for each category
              <div
                key={index} // Unique key for React to track this category
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                } ${isCategoryExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
              >
                {/* Category Header - Always Visible */}
                <div
                  className={`cursor-pointer p-6 sm:p-8 transition-all duration-300 ${
                    isCategoryExpanded 
                      ? (isDarkMode ? 'bg-gray-750' : 'bg-gray-50') 
                      : (isDarkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50')
                  }`}
                  onClick={() => handleCategoryClick(index)} // Trigger expansion/collapse on click
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Category Title with Icon */}
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          isDarkMode ? 'bg-gray-700' : 'bg-orange-100'
                        }`}>
                          {index === 0 ? '🍕' : index === 1 ? '🍔' : index === 2 ? '🍜' : '🍽️'}
                        </div>
                        <div>
                          <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {category.title || `Category ${index + 1}`}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {numberOfItems} delicious items
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Animated Chevron */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 group-hover:bg-gray-600' 
                          : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                      } ${isCategoryExpanded ? "rotate-180 scale-110" : "group-hover:scale-105"}`}
                    >
                      <span className="text-xl">▼</span>
                    </div>
                  </div>
                </div>

                {/* Expandable Content - Items Grid */}
                <div className={`transition-all duration-500 ${
                  isCategoryExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <div className={`px-6 sm:px-8 pb-6 sm:pb-8 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    {category?.itemCards && category.itemCards.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {category.itemCards.map((menuItem, itemIndex) => (
                          // Render each item using the Item component
                          <Item
                            key={menuItem?.card?.info?.id || `item-${itemIndex}`} // Unique key for each item
                            item={menuItem} // Pass the item data
                            isDarkMode={isDarkMode} // Pass dark mode state to Item component
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="text-4xl mb-2">😔</div>
                        <p>No items available in this category</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Bottom Border */}
                <div className={`h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ${
                  isCategoryExpanded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-500`}></div>
              </div>
            );
          }), [categories, expandedCategoryIndex, isDarkMode, handleCategoryClick])}
        </div>
      )}
    </div>
  );
};

// Export the component so it can be used in other files
export default RestaurantCategory;
//liefting stateup the react