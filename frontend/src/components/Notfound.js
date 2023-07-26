import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Notfound() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate=useNavigate();
    const role=user.user.role;
  return (
    <div>
        <button onClick={()=>{if(role=="vendor"){
    navigate("/login");
}
else if(role=="customer"){
    navigate("/customer");
}
else{
    navigate("/admin")
}}} style={{border:"none",color:"white",backgroundColor:"black",height:"20px",width:"100px",marginBottom:"20px",borderRadius:"10px",cursor:"pointer"}} >go back</button>
      <p>Logout and try again</p>
    </div>
  )
}

export default Notfound
