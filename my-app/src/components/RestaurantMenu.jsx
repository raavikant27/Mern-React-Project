import React, { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/contants';

function RestaurantMenu() {
  const [resInfo, setResInfo] = useState(null);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [error, setError] = useState(null); // Added for error handling
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, [resId]); // Added resId as dependency to refetch if it changes

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const json = await response.json();
      console.log('Fetched API JSON:', JSON.stringify(json, null, 2));
      console.log('Data object:', json.data);
      console.log('All data keys:', Object.keys(json.data || {}));
      console.log('Cards array:', json.data?.cards);
      if (!json.data) {
        throw new Error('No data found in API response');
      }
      setResInfo(json.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      setResInfo(null);
    }
  };

  // Render Shimmer or Error
  if (error) {
    return (
      <div className="error" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Error</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (resInfo === null) {
    console.log('Rendering Shimmer: resInfo is null');
    return <Shimmer />;
  }

  // Find restaurant info dynamically
  const infoCard = resInfo?.cards?.find(
    (card) => card?.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.Restaurant'
  )?.card?.card?.info || {};
  console.log('Info card:', infoCard);
  const { name, cuisines, costForTwoMessage, avgRatingString, totalRatingsString, sla } = infoCard;

  // Extract all menu items recursively
  const getAllItems = (cards) => {
    if (!cards) return [];
    return cards.flatMap((c) => {
      const cardContent = c?.card?.card;
      if (cardContent?.itemCards) {
        return cardContent.itemCards;
      } else if (cardContent?.categories) {
        return getAllItems(cardContent.categories);
      }
      return [];
    });
  };

  // Extract regular cards
  const menuCard = resInfo?.cards?.find((c) => c.groupedCard);
  const regularCards = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
  console.log('Regular cards:', regularCards);

  // Filter cards with items or subcategories
  const menuItemsCards = regularCards.filter(
    (c) => c?.card?.card?.itemCards || c?.card?.card?.categories
  );
  console.log('Menu items cards:', menuItemsCards);

  // Get all itemCards
  let itemCards = getAllItems(menuItemsCards);
  console.log('Extracted itemCards:', itemCards);

  // Fallback: Check other possible locations
  if (itemCards.length === 0 && resInfo?.cards) {
    itemCards = resInfo.cards
      .flatMap((card) => {
        const cardContent = card?.card?.card;
        if (cardContent?.itemCards) {
          return cardContent.itemCards;
        } else if (cardContent?.categories) {
          return getAllItems(cardContent.categories);
        }
        return cardContent?.menuItems || cardContent?.items || [];
      })
      .filter(Boolean);
    console.log('Fallback itemCards:', itemCards);
  }

  // Additional fallback: Check top-level or other structures
  if (itemCards.length === 0) {
    itemCards = resInfo?.menu?.items || resInfo?.items || resInfo?.data?.itemCards || [];
    console.log('Additional fallback itemCards:', itemCards);
  }

  // Filter items based on veg-only toggle
  const filteredItems = showVegOnly
    ? itemCards.filter((item) => item?.card?.info?.isVeg === 1)
    : itemCards;
  console.log('Filtered items:', filteredItems);

  // Get item price
  const getItemPrice = (item) => {
    try {
      if (item?.card?.info?.variantsV2?.pricingModels) {
        const prices = item.card.info.variantsV2.pricingModels.map((model) => model.price / 100);
        return Math.min(...prices).toFixed(2);
      }
      return ((item?.card?.info?.price || item?.card?.info?.defaultPrice || 0) / 100).toFixed(2);
    } catch (error) {
      console.error('Price calculation error for item:', item, error);
      return 'N/A';
    }
  };

  // Render variants
  const renderVariants = (variantsV2) => {
    if (!variantsV2?.variantGroups) return null;
    return variantsV2.variantGroups.map((group) => (
      <div key={group.groupId} style={{ marginLeft: '20px', marginTop: '10px' }}>
        <h4>{group.name}</h4>
        <ul>
          {group.variations.map((variation) => (
            <li key={variation.id}>
              {variation.name} {variation.price ? ` - ₹${(variation.price / 100).toFixed(2)}` : ''}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="menu" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{name || 'Restaurant Name Not Available'}</h1>
      <h2>{cuisines ? cuisines.join(', ') : 'Cuisine Not Available'}</h2>
      <h3>{costForTwoMessage || 'Cost Not Available'}</h3>
      <h3>
        Rating: {avgRatingString || 'N/A'} ({totalRatingsString || 'No ratings'})
      </h3>
      <h3>Delivery Time: {sla?.slaString || 'N/A'}</h3>
      <div style={{ margin: '10px 0' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: showVegOnly ? '#28a745' : '#f8f9fa',
            color: showVegOnly ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setShowVegOnly(!showVegOnly)}
        >
          {showVegOnly ? 'Show All Items' : 'Veg Only'}
        </button>
      </div>
      <h2>Menu</h2>
      {itemCards.length === 0 ? (
        <div>
          <p style={{ color: 'red' }}>
            No menu items found. Check console logs for API response structure.
          </p>
          <pre style={{ maxHeight: '300px', overflow: 'auto', background: '#f0f0f0', padding: '10px' }}>
            {JSON.stringify(resInfo, null, 2)}
          </pre>
        </div>
      ) : filteredItems.length === 0 ? (
        <p>No {showVegOnly ? 'vegetarian' : 'menu'} items available.</p>
      ) : (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={item?.card?.info?.id || `item-${index}`}>
              <div>
                <strong>{item?.card?.info?.name || 'Item Name Not Available'}</strong> - ₹{getItemPrice(item)}
                {item?.card?.info?.isVeg === 1 && (
                  <span style={{ color: 'green', marginLeft: '10px' }}>🟢 Veg</span>
                )}
                {item?.card?.info?.description && (
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                    {item.card.info.description}
                  </p>
                )}
                {item?.card?.info?.variantsV2 && renderVariants(item.card.info.variantsV2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantMenu;