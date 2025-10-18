import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const Grocery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [cartNotification, setCartNotification] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  // Grocery Categories
  const categories = [
    { id: 'all', name: 'All Items', icon: '🛒', color: 'bg-blue-500' },
    { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥬', color: 'bg-green-500' },
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎', color: 'bg-red-500' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛', color: 'bg-yellow-500' },
    { id: 'bakery', name: 'Bakery', icon: '🍞', color: 'bg-orange-500' },
    { id: 'snacks', name: 'Snacks', icon: '🍪', color: 'bg-purple-500' },
    { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'bg-cyan-500' },
    { id: 'personal', name: 'Personal Care', icon: '🧴', color: 'bg-pink-500' },
    { id: 'household', name: 'Household', icon: '🧽', color: 'bg-gray-500' }
  ];

  // Sample Grocery Products (In real app, this would come from API)
  const groceryProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "vegetables",
      price: 45,
      originalPrice: 60,
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop",
      rating: 4.3,
      discount: 25,
      inStock: true,
      description: "Fresh, juicy tomatoes perfect for cooking"
    },
    {
      id: 2,
      name: "Organic Bananas",
      category: "fruits",
      price: 55,
      originalPrice: 65,
      unit: "per dozen",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      rating: 4.5,
      discount: 15,
      inStock: true,
      description: "Sweet, organic bananas rich in potassium"
    },
    {
      id: 3,
      name: "Fresh Milk",
      category: "dairy",
      price: 65,
      originalPrice: 70,
      unit: "per liter",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
      rating: 4.7,
      discount: 7,
      inStock: true,
      description: "Pure, fresh milk from local farms"
    },
    {
      id: 4,
      name: "Whole Wheat Bread",
      category: "bakery",
      price: 45,
      originalPrice: 50,
      unit: "per loaf",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop",
      rating: 4.2,
      discount: 10,
      inStock: true,
      description: "Fresh baked whole wheat bread"
    },
    {
      id: 5,
      name: "Potato Chips",
      category: "snacks",
      price: 20,
      originalPrice: 25,
      unit: "per pack",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
      rating: 4.0,
      discount: 20,
      inStock: true,
      description: "Crispy and delicious potato chips"
    },
    {
      id: 6,
      name: "Orange Juice",
      category: "beverages",
      price: 85,
      originalPrice: 100,
      unit: "per liter",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop",
      rating: 4.4,
      discount: 15,
      inStock: true,
      description: "Fresh squeezed orange juice"
    },
    {
      id: 7,
      name: "Basmati Rice",
      category: "all",
      price: 120,
      originalPrice: 140,
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      rating: 4.6,
      discount: 14,
      inStock: true,
      description: "Premium quality basmati rice"
    },
    {
      id: 8,
      name: "Green Apples",
      category: "fruits",
      price: 180,
      originalPrice: 200,
      unit: "per kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      rating: 4.3,
      discount: 10,
      inStock: true,
      description: "Crisp and sweet green apples"
    }
  ];

  // Filter and sort products
  const filteredProducts = groceryProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: 'grocery'
    }));
    setCartNotification(`${product.name} added to cart!`);
    setTimeout(() => setCartNotification(''), 2000);
  };

  useEffect(() => {
    // Simulate loading effect
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            🛒 Sweegy Grocery Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fresh groceries delivered to your doorstep in 30 minutes
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">🚚 Free Delivery</span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">⚡ 30 Min Delivery</span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">🎯 Best Prices</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Offers</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">🔥 Today's Special Offers</h3>
              <p className="text-lg opacity-90">Up to 25% off on fresh fruits and vegetables!</p>
            </div>
            <div className="text-6xl opacity-50">🎁</div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredProducts.length} items)
              </span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'h-48'}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/f0f0f0/999999?text=Product';
                      }}
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {product.discount}% OFF
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating) ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-500 line-through ml-2">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        <div className="text-gray-500 text-sm">{product.unit}</div>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                        product.inStock
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Notification */}
        {cartNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            ✅ {cartNotification}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            📬 Stay Updated with Latest Offers
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Subscribe to get notifications about new products and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grocery;