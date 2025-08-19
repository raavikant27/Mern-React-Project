import React from 'react';
import RestaurantCard from './RestaurantCard';

function Body() {
  return (
    <div className='body'>
      <div className='search'>
        Search 
      </div>
      <div className='res-container'>  
        <RestaurantCard resName="meghna-Food" cuisine="biryani,North Indian,Asian"rating="3.2"/>
        <RestaurantCard resName="kgc" cuisine="burgur,fast-Food"rating="5.0" />
         <RestaurantCard resName="birayani tadk"cuisine="good -food"rating="4.5"/>
        <RestaurantCard/>
         <RestaurantCard/>
        <RestaurantCard/>
      </div>
    </div>
  );
}


export default Body;
