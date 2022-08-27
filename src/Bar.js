import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const Bar=({clickedSaveSubmit,clickSaveSubmitHandler})=>{
    const history=useHistory();
    const location=useLocation();
    const goToLogin=(e)=>{
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("currUserMap");
        history.push("/login");
        window.location.reload();
    }
    const [currPathName,setCurrPathName]=useState("");
    useEffect(()=>{
        setCurrPathName(location.pathname);
        console.log(currPathName);
    },[location.pathname])
    return(
        <div className="m-3">
            <ul className="nav nav-pills d-flex justify-content-start">
                {/* <div className="d-flex justify-content-around"> */}
                    <li className="nav-item m-1">
                        <button className="btn btn-warning" onClick={(e)=>{goToLogin(e)}}>Sign Out</button>
                    </li>
                    {currPathName=="/poll" && 
                        <li className="nav-item m-1">
                        <button className="btn btn-primary" 
                        // onClick={(e)=>{goToLogin(e)}}
                        onClick={(e)=>{
                            clickSaveSubmitHandler(e)
                        }}
                        >Save and Submit</button>
                    </li>
                    }
                {/* </div> */}
            </ul>
            
        </div>
    )
}

export default Bar;