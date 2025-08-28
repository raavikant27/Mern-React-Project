import React from 'react'
import { useRouteError } from 'react-router-dom'
function Error() {
    const err=useRouteError();
    console.log(err);
  return (
    <div>
    <h1>oops !!</h1>
   <h1>400 eror is found</h1>



    </div>
  )
}

export default Error