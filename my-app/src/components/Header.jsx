import React, { useState ,useEffect} from 'react'

import { Link, Links } from 'react-router-dom';
function Header() {

   const [btnNameReact,setbtnNameReact]=useState("login");
//if no dependency array => useffect is called on every render
//it will call every time when header render, our use effect call first header will render then use efect call render eveytime 
//if dependency array is empty =[]=> use effect is called on initial render (just once).
//if dependecy array is  [btnNmaeReact]=> called everytime btnNameReact is updated
useState(()=>{
console.log("useeffect called")
},[btnNameReact]);
  
  return (
    <div className="header">
    
     <div className='logo-container'>
     {/* <img className='logo' src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"/> */}
        <img className='logo' src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"/>
     </div>
     
   <div className="nav-items">  

    <ul>
   <li >home</li>
   <li>
    <Link to="/about">About us</Link>
    </li>
   <li>
    <Link to="/contact"> Contact us</Link>
   </li>
   <li>
    <Link to="/cart">cart</Link>
    </li>
   <button
    className='login'
     onClick={()=>{
      btnNameReact==="Login"
      ? setbtnNameReact("Logout")
      : setbtnNameReact ("Login");
      console.log(btnNameReact);
      }}>
    
    
    
    {btnNameReact}
    
    
    </button>
    </ul>

   </div>




    </div>
  )
}

export default Header