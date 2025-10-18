import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from "./components/Cart";
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import UserContext from './utils/UserContext';

import { Provider } from "react-redux";
import appStore from './utils/appStore';

// Lazy load Grocery component
const Grocery = lazy(() => import("./components/Grocery"));

// Protected Route component - only allows access when logged in
const ProtectedRoute = ({ children, isDarkMode }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route component - redirects to dashboard if already logged in
const PublicRoute = ({ children, isDarkMode }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Default Route Component - shows different content based on auth state
const DefaultRoute = ({ isDarkMode }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  
  if (isAuthenticated) {
    return <Body isDarkMode={isDarkMode} />;
  }
  
  return <Welcome isDarkMode={isDarkMode} />;
};

const App = ({ isDarkMode, setIsDarkMode }) => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const [userName, setUserName] = useState('');

  // Set username from auth state or default
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserName(user.name || user.email?.split('@')[0] || 'User');
    } else {
      setUserName('Guest');
    }
  }, [isAuthenticated, user]);

  // Apply dark mode class to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="min-h-screen">
        <Header 
          className="app" 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          isAuthenticated={isAuthenticated}
        />
        <Outlet />
        {isAuthenticated && <Footer isDarkMode={isDarkMode} />}
      </div>
    </UserContext.Provider>
  );
};

// Main component to provide the router and manage theme state
const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Create router with authentication-based access control
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Provider store={appStore}>
          <App isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </Provider>
      ),
      children: [
        // Default route - shows Welcome or Dashboard based on auth
        { 
          path: "/", 
          element: <DefaultRoute isDarkMode={isDarkMode} />
        },

        // Dashboard route - main app when logged in
        { 
          path: "/dashboard", 
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <Body isDarkMode={isDarkMode} />
            </ProtectedRoute>
          ) 
        },

        // Protected Routes - require authentication
        { 
          path: "/about", 
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <About isDarkMode={isDarkMode} />
            </ProtectedRoute>
          ) 
        },
        { 
          path: "/contact", 
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <Contact isDarkMode={isDarkMode} />
            </ProtectedRoute>
          ) 
        },
        {
          path: "/grocery",
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <Suspense fallback={
                <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <h1 className="text-xl font-semibold">Loading Grocery Store...</h1>
                  </div>
                </div>
              }>
                <Grocery isDarkMode={isDarkMode} />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        { 
          path: "/restaurants/:resId", 
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <RestaurantMenu isDarkMode={isDarkMode} />
            </ProtectedRoute>
          ) 
        },
        { 
          path: "/cart", 
          element: (
            <ProtectedRoute isDarkMode={isDarkMode}>
              <Cart isDarkMode={isDarkMode} />
            </ProtectedRoute>
          ) 
        },
        
        // Public Routes - accessible without authentication
        { 
          path: "/login", 
          element: (
            <PublicRoute isDarkMode={isDarkMode}>
              <Login isDarkMode={isDarkMode} />
            </PublicRoute>
          ) 
        },
        { 
          path: "/signup", 
          element: (
            <PublicRoute isDarkMode={isDarkMode}>
              <Signup isDarkMode={isDarkMode} />
            </PublicRoute>
          ) 
        },
      ],
      errorElement: <Error isDarkMode={isDarkMode} />,
    },
  ]);

  return (
    <RouterProvider router={appRouter} />
  );
};

export default Root;