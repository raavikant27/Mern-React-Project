import { useEffect, useState } from "react";

const useOnlinestatus=()=>{



    const [onlinestatus,setOnlineStatus]=useState(true);
  //cheak if online
   useEffect(()=>{

    window.addEventListener("offline",()=>{
   setOnlineStatus(false);
    })
     window.addEventListener("online",()=>{
   setOnlineStatus(true);
    })

},[]);

  //boolean value
 return onlinestatus;
}
export default useOnlinestatus;