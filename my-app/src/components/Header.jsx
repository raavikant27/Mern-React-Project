import React, { useState } from 'react'


function Header() {

   const [btnNameReact,setbtnNameReact]=useState("login");

  
  return (
    <div className="header">
    
     <div className='logo-container'>
     <img className='logo' src="https://static.vecteezy.com/system/resources/previews/014/971/638/original/food-logo-design-template-restaurant-free-png.png"/>

     </div>
     
   <div className="nav-items">  

    <ul>
   <li>Home</li>

   <li>about us</li>
   <li>Contact us</li>
   <li>cart</li>
   <button
    className='login'
     onClick={()=>{
      setbtnNameReact("Logout");
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