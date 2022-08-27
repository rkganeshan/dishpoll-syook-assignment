import React from "react";
import { useHistory } from "react-router-dom";
import Bar from "./Bar";

const Main=()=>{
    const history=useHistory();
    return(
        <>
            <Bar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <div className="card btn mt-lg-5 mt-2 btn-outline-danger" onClick={()=>{
                            history.push("/poll");
                        }}>
                                <div className="card-body">
                                    <h5 className="card-title">Choose Rank for Dishes</h5>
                                </div>
                        </div>
                        {JSON.parse(localStorage.getItem("overAllRanks"))[JSON.parse(localStorage.getItem("overAllRanks")).length-1].userId==JSON.parse(localStorage.getItem("loggedInUser")).id
                        && 
                            <div className="card btn mt-lg-5 mt-2 btn-outline-danger" 
                            onClick={()=>{
                               history.push("/pollresult");
                           }}
                           >
                                   <div className="card-body">
                                       <h5 className="card-title">View Selection</h5>
                                   </div>
                           </div>
                        }
                        {JSON.parse(localStorage.getItem("overAllRanks"))[JSON.parse(localStorage.getItem("overAllRanks")).length-1].userId!=JSON.parse(localStorage.getItem("loggedInUser")).id
                            && 
                            <div className="card btn mt-lg-5 mt-2 btn-outline-danger disabled" 
                            
                           >
                                   <div className="card-body">
                                       <h5 className="card-title">View Selection</h5>
                                   </div>
                           </div>
                        }
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </>
    )
}

export default Main;