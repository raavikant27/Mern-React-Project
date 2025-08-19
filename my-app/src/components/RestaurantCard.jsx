import React from 'react'




function RestaurantCard(props) {
  //recived and 
  // console.log(props);
  // we can also write like this 
  const {resData}=props;

  return (
    <div  className="res-card" style={{ backgroundColor:"#f0f0f0"}}>

   <img className='res-logo'
     alt="res-logo"
   
     src="https://png.pngtree.com/png-clipart/20230207/original/pngtree-burger-logo-fast-food-illustration-png-image_8947966.png"
   
   
   
   />
   <h3>{resData.data.name}</h3>
   <h4>{resData.data.cuisines}</h4>
   <h4>{resData.data.avgRating}Stars</h4>
   <h4>{resData.data.cloudinaryImageId}</h4>
    </div>
  )
}

export default RestaurantCard