import React, { useState } from 'react'

export default function User({name}) {

  const [count]=useState(0);
   return <div className="user-card">
<h1>count={count}</h1>
   <h2>Name :{name}</h2>
   <h3>Location : Vns</h3>
   <h4>Contact : 7052513167</h4>
   
 </div>

}
