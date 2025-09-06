import React from 'react';

function Shimmer() {
  return (
    <div className="shimmer-container flex flex-wrap justify-center gap-6 p-6 font-sans bg-gray-50 min-h-screen">
      {Array(12) // Adjusted to a reasonable number for restaurant cards
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="shimmer-card bg-gray-200 animate-pulse w-72 h-64 rounded-lg shadow-md p-4"
          >
            <div className="w-full h-40 bg-gray-300 animate-pulse mb-4 rounded"></div> {/* Image placeholder */}
            <div className="h-6 bg-gray-300 animate-pulse mb-2 rounded"></div> {/* Name */}
            <div className="h-4 bg-gray-300 animate-pulse w-1/3 mb-2 rounded"></div> {/* Rating/Cuisine */}
            <div className="h-4 bg-gray-300 animate-pulse w-1/4 rounded"></div> {/* Other info */}
          </div>
        ))}
    </div>
  );
}

export default Shimmer;

export const RestaurantMenuShimmer = () => {
  return (
    <div className="shimmer-menu w-6/12 mx-auto my-6 bg-white shadow-xl p-6 rounded-lg border border-gray-200 pt-24">
      {Array(9)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="shimmer-card bg-gray-200 animate-pulse w-full border-b-2 border-gray-200 p-2 m-2 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="w-40 p-4 flex-shrink-0 relative">
                <div className="absolute">
                  <div className="w-20 h-20 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-10 h-6 bg-gray-300 animate-pulse mt-1 mx-auto rounded"></div> {/* Button placeholder */}
                </div>
              </div>
              <div className="w-9/12 ml-24">
                <div className="h-6 bg-gray-300 animate-pulse mb-2 rounded"></div> {/* Name */}
                <div className="h-4 bg-gray-300 animate-pulse w-1/3 mb-2 rounded"></div> {/* Price */}
                <div className="h-4 bg-gray-300 animate-pulse w-1/4 rounded"></div> {/* Rating */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};