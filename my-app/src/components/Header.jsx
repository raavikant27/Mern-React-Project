import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Corrected import, removed 'Links'
import useOnlinestatus from '../utils/useOnlinestatus';
function Header() {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const onlinestatus=useOnlinestatus ();
  // Correct useEffect with dependency array
  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);



  return (
    <div className=" p-5 flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-100">
      <div className='logo-container'>
        <img className='w-60' src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png" />
      </div>
      
      <div className="flex items-center">
        <ul className='flex p-4 m-4'>


            <li className='px-4'>
  Online Status: {onlinestatus ? "green-Online" : "red-Offline"}
            </li>
          <li className='px-4'>
            <Link to="/">Home</Link>
          </li>
          <li className='px-4'>
            <Link to="/about">About us</Link>
          </li>
          <li className='px-4'>
            <Link to="/contact">Contact us</Link>
          </li>
          <li className='px-4'>
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className='px-4'>
            <Link to="/cart">Cart</Link>
          </li>
          <button 
            className='login'
            onClick={() => {
              setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              console.log(btnNameReact);
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Header;