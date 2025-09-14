import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from "./components/cart";
import Login from './components/Login';
import UserContext from './utils/UserContext';

import { Provider } from "react-redux";

import appStore from './utils/appStore';

// Lazy load Grocery component
const Grocery = lazy(() => import("./components/Grocery"));

const App = ({ isDarkMode, setIsDarkMode }) => {
  // User authentication state
  const [userName, setUserName] = useState('');

  // Simulate authentication API call and set username
  useEffect(() => {
    const data = {
      name: "ravikant Singh", // Username with space
    };
    setUserName(data.name);
  }, []);

  // Apply dark mode class to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Provider store={appStore}>
      {/* Provide both loggedInUser and setUserName in context */}
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="min-h-screen">
          <Header className="app" isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Outlet />
          <Footer isDarkMode={isDarkMode} />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

// Router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App isDarkMode={false} setIsDarkMode={() => {}} />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurants/:resId", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
    ],
    errorElement: <Error />,
  },
]);

// Main component to provide the router and manage theme state
const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <RouterProvider router={appRouter} />
  );
};

export default Root;