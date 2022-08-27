import React, { useEffect,useState } from "react";
import {Route,Switch,BrowserRouter} from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import NotFound from "./NotFound";
import Poll from "./Poll";
import PollResult from "./PollResult";
import axios from "axios";
const AppRouter=()=>{
    const [foodApiData,setFoodApiData]=useState([]);
    const [currentUserOverAllRank,setCurrentUserOverAllRank]=useState([]);
    const currentUserRankHandler=(rankArr)=>{
        setCurrentUserOverAllRank(rankArr)
    }
    useEffect(()=>{
        async function callApiData()
        {
            try{
                const res=await axios.get('https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json');
                console.log(res.data);
                setFoodApiData(res.data);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        callApiData();
        console.log("localStorage.getItem('loggedInUser')",localStorage.getItem("loggedInUser"))
    },[]);
    return(
        <BrowserRouter>
                <Switch>
                    {localStorage.getItem("loggedInUser") && 
                        <>
                            <Route exact path="/" component={Main} />
                            <Route exact path="/main" component={Main}/>
                            <Route exact path="/login" component={Main}/>
                            <Route exact path="/poll" component={()=><Poll foodApiData={foodApiData} 
                                currentUserOverAllRank={currentUserOverAllRank} currentUserRankHandler={currentUserRankHandler}
                            />} />
                            <Route exact path="/pollresult" component={()=><PollResult
                                currentUserOverAllRank={currentUserOverAllRank}
                            />}/>
                        </>
                    }
                    {localStorage.getItem("loggedInUser")==null && 
                        <>
                            <Route path="/" component={Login}/>
                            {/* <Route exact path="/main" component={Login}/>
                            <Route exact path="/login" component={Login}/> */}
                            {/* <Route exact path="/poll" component={Poll}/>
                            <Route exact path="/pollresult" component={PollResult}/> */}
                        </>
                    }
                    {/* <Route exact path="/login" component={Login}/> */}
                    {/* <Route exact path="/friend" component={UserPlayground}/> */}
                    <Route exact component={NotFound}/>
                </Switch>
            </BrowserRouter>
    )
}

export default AppRouter;