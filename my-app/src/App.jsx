import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import Login from './components/Login';
import UserContext from './utils/UserContext';

// Lazy load Grocery
const Grocery = lazy(() => import("./components/Grocery"));


const App = ({ isDarkMode, setIsDarkMode }) => {


  //authentication 

const [userName,setUserName]=useState();
//authentication logic
 useEffect(()=>{
   //make an api call and send username passowrd
   const data ={

    name:"ravikant"
   }
 
setUserName(data.name);
 },[])




  // Apply dark mode class to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <UserContext.Provider value={{loggedInUser: userName}}>
    <div className="min-h-screen">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Outlet />
      <Footer isDarkMode={isDarkMode} /> {/* Ensure prop is passed */}
    </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App isDarkMode={false} setIsDarkMode={() => {}} />, // Initial state, will be overridden by Root
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading..</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

// Main component to provide the router and manage theme state
const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <RouterProvider
      router={appRouter}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
    />
  );
};

export default Root;