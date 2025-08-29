// import "../styles/About.css";

// const About = () => {
//   return (
//     <div className="about-container">
//       <div className="about-left">
//         <h1>
//           Welcome to <br /> The world of <br /> <span>Tasty & Fresh Food</span>
//         </h1>
//         <h4>
//           "Better you will feel if you eat a Tasty<span>Trails</span> healthy
//           meal"
//         </h4>
//       </div>
//       <div className="about-right">
//         <img
//           src="https://mxmenu.net/wp-content/uploads/2023/10/BURGER-KING.jpg"
//           alt="Food Image"
//         />
//       </div>
//     </div>
//   );
// };

// export default About;
import User from "./User";
import UserClass from "./UserClass";
import React from 'react'

function About() {
  return (
    <div>
  
   <h1>About</h1>
   <h2>This Is Ravikant Singh</h2>

 <User name={"raviaknt singh (functions"}/>
<UserClass name={"ravikant singh (class)"} location={"Vanarasi class"}/>

    </div>
  )
}

export default About
