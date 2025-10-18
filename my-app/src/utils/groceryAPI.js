// Real API Integration Examples for Grocery Data

// 1. Grocery API Service
export const groceryAPI = {
  // Fetch all products
  getAllProducts: async () => {
    try {
      const response = await fetch('/api/grocery/products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Fetch products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`/api/grocery/products?category=${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category products:', error);
      return [];
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`/api/grocery/search?q=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};

// 2. Real Data Structure (BigBasket/Grofers Style)
const realGroceryAPIResponse = {
  "products": [
    {
      "id": "PROD001",
      "name": "Fresho Tomato - Local",
      "brand": "Fresho",
      "category": "vegetables",
      "subcategory": "fresh_vegetables",
      "price": 28,
      "mrp": 35,
      "discount": 20,
      "unit": "kg",
      "pack_size": "1 kg",
      "image_urls": [
        "https://cdn.grofers.com/app/images/products/sliding_image/10590a.jpg",
        "https://cdn.grofers.com/app/images/products/sliding_image/10590b.jpg"
      ],
      "rating": 4.2,
      "reviews_count": 1250,
      "stock_quantity": 50,
      "is_available": true,
      "delivery_time": "30 mins",
      "tags": ["fresh", "local", "pesticide_free"],
      "nutritional_info": {
        "calories_per_100g": 18,
        "protein": "0.9g",
        "carbs": "3.9g",
        "fat": "0.2g"
      },
      "storage_instructions": "Store in cool, dry place",
      "shelf_life": "2-3 days",
      "origin": "Karnataka, India"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 25,
    "total_products": 500
  },
  "filters": {
    "categories": ["vegetables", "fruits", "dairy"],
    "brands": ["Fresho", "Organic India", "Amul"],
    "price_ranges": ["0-50", "50-100", "100-200"]
  }
};

// 3. Popular Grocery APIs in India
const popularGroceryAPIs = {
  // BigBasket API
  bigbasket: {
    baseURL: "https://api.bigbasket.com/v1",
    endpoints: {
      products: "/products",
      categories: "/categories", 
      search: "/search",
      deals: "/deals"
    }
  },

  // Grofers (Blinkit) API
  grofers: {
    baseURL: "https://api.grofers.com/v2",
    endpoints: {
      catalog: "/catalog",
      inventory: "/inventory",
      offers: "/offers"
    }
  },

  // JioMart API
  jiomart: {
    baseURL: "https://api.jiomart.com/v3",
    endpoints: {
      products: "/products",
      categories: "/categories"
    }
  }
};

// 4. Custom Hook for Real Data
export const useGroceryData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Replace with real API call
        const data = await groceryAPI.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// 5. Real Implementation in Component
const GroceryWithRealAPI = () => {
  const { products, loading, error } = useGroceryData();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// 6. Environment-based Data Source
const getDataSource = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use real API in production
    return groceryAPI.getAllProducts();
  } else {
    // Use mock data in development
    return Promise.resolve(mockGroceryProducts);
  }
};

export default getDataSource;