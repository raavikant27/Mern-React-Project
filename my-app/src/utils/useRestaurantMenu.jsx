import { MENU_API } from "../utils/contants";
import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (resId) {
      fetchData();
    }
  }, [resId]);

  const fetchData = async () => {
    try {
      console.log("Fetching menu for restaurant ID:", resId);
      
      // Try multiple API endpoints for menu including real Swiggy API
      const menuAPIs = [
        `https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}`,
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.63270&lng=77.21980&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`,
        `https://corsproxy.io/?${encodeURIComponent(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.63270&lng=77.21980&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`)}`,
        `https://corsproxy.io/?${encodeURIComponent(MENU_API + resId)}`,
        MENU_API + resId
      ];

      for (let i = 0; i < menuAPIs.length; i++) {
        try {
          console.log(`Trying menu API ${i + 1}: ${menuAPIs[i]}`);
          const response = await fetch(menuAPIs[i]);
          
          console.log("Menu API response status:", response.status);
          
          if (!response.ok) {
            console.log(`Menu API ${i + 1} failed with status:`, response.status);
            continue;
          }

          const text = await response.text();
          console.log("Response text length:", text.length);
          
          if (!text || text.trim() === '') {
            console.log(`Menu API ${i + 1} returned empty response`);
            continue;
          }

          const json = JSON.parse(text);
          console.log("Menu API response:", json);
          
          if (json && json.data) {
            setResInfo(json.data);
            return; // Success, exit the loop
          } else {
            console.log(`Menu API ${i + 1} returned invalid data structure`);
            continue;
          }
        } catch (error) {
          console.error(`Error with menu API ${i + 1}:`, error);
          continue;
        }
      }

      // If all APIs fail, set mock data or null
      console.log("All menu APIs failed, creating mock data");
      
      // Create basic mock data structure for the restaurant
      const mockMenuData = {
        cards: [
          {
            card: {
              card: {
                "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
                info: {
                  id: resId,
                  name: "Restaurant",
                  cuisines: ["Indian", "Chinese"],
                  avgRatingString: "4.0",
                  totalRatingsString: "100+",
                  costForTwoMessage: "₹300 for two",
                  sla: {
                    slaString: "30-40 mins"
                  },
                  areaName: "Local Area",
                  city: "City"
                }
              }
            }
          },
          {
            groupedCard: {
              cardGroupMap: {
                REGULAR: {
                  cards: [
                    {
                      card: {
                        card: {
                          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                          title: "Recommended",
                          itemCards: [
                            {
                              card: {
                                info: {
                                  id: "mock1",
                                  name: "Special Dish",
                                  price: 25000,
                                  description: "Delicious specialty dish",
                                  imageId: "placeholder",
                                  isVeg: 1
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      };
      
      setResInfo(mockMenuData);
      
    } catch (error) {
      console.error("Error in fetchData:", error);
      setResInfo(null);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;