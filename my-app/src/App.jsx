import React from 'react';
import { RouterProvider, createBrowserRouter,Outlet} from 'react-router-dom';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
const App = () => {
  return (
    <div>
      <Header />
   <Outlet/>
      
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[


      {

        path:"/",
        element: <Body />,
      },
 {
    path: "/about",
    element: <About />,
  },
  {

    path:"/Contact",
    element:<Contact/>,
  },
  {

    path:"/restaurants/:resId",

    element:<RestaurantMenu/>,
  },
  {

    path:"/cart",

    element:<Cart/>,
  }
  

    ],
     errorElement: <Error/>
  },
  
]);

// Main component to provide the router
const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;