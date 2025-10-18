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
      
      // Skip API calls for now and directly load mock data
      console.log("Loading mock menu data due to API issues");
      
      // Create basic mock data structure for the restaurant using real Swiggy data
      const mockMenuData = {
        cards: [
          {
            card: {
              card: {
                "@type": "type.googleapis.com/swiggy.presentation.food.v2.Restaurant",
                info: {
                  id: resId,
                  name: "Chinese Wok",
                  cuisines: ["Chinese", "Asian", "Tibetan", "Desserts"],
                  avgRatingString: "4.3",
                  totalRatingsString: "6.0K+",
                  costForTwoMessage: "₹250 for two",
                  sla: {
                    slaString: "25-30 mins"
                  },
                  areaName: "Adugodi",
                  city: "Bangalore",
                  cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597"
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
                                  id: "5906727",
                                  name: "Chicken Fried Rice",
                                  price: 25000,
                                  description: "Fried rice tossed with chicken, vegetables and aromatic spices",
                                  cloudinaryImageId: "px0zd7sfqxl8gpz9zxek",
                                  isVeg: 0
                                }
                              }
                            },
                            {
                              card: {
                                info: {
                                  id: "5906731",
                                  name: "Veg Hakka Noodles", 
                                  price: 22000,
                                  description: "Hakka style noodles tossed with fresh vegetables and sauces",
                                  cloudinaryImageId: "rn9av4qn9l6xtn9zltst",
                                  isVeg: 1
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      card: {
                        card: {
                          "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                          title: "Chinese Main Course",
                          itemCards: [
                            {
                              card: {
                                info: {
                                  id: "5906733",
                                  name: "Chilli Chicken",
                                  price: 30000,
                                  description: "Boneless chicken tossed in spicy chilli sauce with bell peppers",
                                  cloudinaryImageId: "rk7q8z2zx6gv6l9b0y8w",
                                  isVeg: 0
                                }
                              }
                            },
                            {
                              card: {
                                info: {
                                  id: "5906735",
                                  name: "Manchurian Dry",
                                  price: 24000,
                                  description: "Crispy vegetable balls tossed in tangy manchurian sauce",
                                  cloudinaryImageId: "px0zd7sfqxl8gpz9zxek",
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