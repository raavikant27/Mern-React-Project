import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Corrected import, removed 'Links'

function Header() {
  const [btnNameReact, setbtnNameReact] = useState("Login");

  // Correct useEffect with dependency array
  useEffect(() => {
    console.log("useEffect called");
  }, [btnNameReact]);

  return (
    <div className="header">
      <div className='logo-container'>
        <img className='logo' src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png" />
      </div>
      
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>
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