import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bar from "./Bar";
import axios from "axios";
import Card from "./Card";


const Poll=({foodApiData,currentUserOverAllRank,currentUserRankHandler})=>{
    // const [foodApiData,setFoodApiData]=useState([]);
    const [rank,setRank]=useState([[],[],[]]);
    const [totalSelected,setTotalSelected]=useState([]);
    const [clickedSaveSubmit,setClickedSaveSubmit]=useState(false);
    const submitMessage = () => {
        console.log("inside success message")
        toast.success('Save and Submit Success', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const clickSaveSubmitHandler=(e)=>{
        e.preventDefault();
        currentUserRankHandler(rank);
        console.log("rank list::",rank);
        console.log("current user rank list ::",currentUserOverAllRank);
        // successSaveSubmit();
        submitMessage();
        // alert("Submit successful");
        if(localStorage.getItem("overAllRanks")!=null)
        {
            console.log("local storage overallranks not null...");
            let storageRankData=JSON.parse(localStorage.getItem("overAllRanks"));
            console.log("storageRankData:",storageRankData);
            let newObj={
                username:JSON.parse(localStorage.getItem("loggedInUser")).username,
                userId:JSON.parse(localStorage.getItem("loggedInUser")).id,
                rankList:rank
            }
            if(storageRankData.find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id))
            {
                console.log("ranklist of the current user exists")
                storageRankData=storageRankData.filter((elem)=>elem.userId!=JSON.parse(localStorage.getItem("loggedInUser")).id)
                storageRankData.push(newObj);
            }
            else
            {
                console.log("ranklist of the current user doesnt exist")
                storageRankData.push(newObj);
            }
            localStorage.setItem("overAllRanks",JSON.stringify(storageRankData));
            // successSaveSubmit();
            // submitMessage();
            history.push("/main");
            // setTimeout(()=>{
            //     history.push("/main");
            // },1000)
        }
        else
        {
            console.log("username from loc storage:",JSON.parse(localStorage.getItem("loggedInUser")).username);
            console.log("user id from loc storage:",JSON.parse(localStorage.getItem("loggedInUser")).id);
            let newObj={
                username:JSON.parse(localStorage.getItem("loggedInUser")).username,
                userId:JSON.parse(localStorage.getItem("loggedInUser")).id,
                rankList:rank
            }
            console.log("newObj:",newObj);
            let newStorageArr=[];
            newStorageArr.push(newObj);
            console.log("newStorageArr:",newStorageArr);
            localStorage.setItem("overAllRanks",JSON.stringify(newStorageArr));
            // successSaveSubmit();
            history.push("/main");
            // setTimeout(()=>{
            //     history.push("/main");
            // },1000)
        }
        setClickedSaveSubmit(!clickSaveSubmitHandler);
    }
    // const handTotalSelected=(newItem,markerForNoRank=1)=>{
    //     // if(markerForNoRank==1)
    //     // {
    //     //     setTotalSelected((prev)=>[...prev,newItem])
    //     // }
    //     // else
    //     // {
    //     //     let filteredArr=totalSelected.filter((item)=>item.id!=newItem.id);
    //     //     setTotalSelected(filteredArr);
    //     // }
    //     let tempArr=[];
    //     rank.forEach((subArr)=>{
    //         subArr.forEach((dish)=>{
    //             tempArr.push(dish);
    //         })
    //     })
    //     setTotalSelected(tempArr);
    // }
    const handleRank=(item,rankValue)=>{
        let checkRanked=rank.find((obj1)=>{
            let retObj;
            obj1.forEach((obj)=>{
                if(obj.id==item.id)
                {
                    retObj= obj;
                }
            })
            return retObj;
        })
        if(!checkRanked && rankValue!=0) //newly ranked (but not no rank)
        {
            let idx=rankValue-1;
            let tempState=rank;
            tempState[idx].push(item);
            setRank(tempState);
            //added here
            let tempArr=[];
            tempState.forEach((subArr)=>{
                subArr.forEach((dish)=>{
                    tempArr.push(dish);
                })
            })
            setTotalSelected(tempArr);
        }
        else //no rank-so deselction
        {
            let tempState=rank;
            for(let it=0;it<tempState.length;it++)
            {
                let tempArr=[];
                tempState[it].forEach((obj,idx)=>{
                    if(obj.id!=item.id)
                    {
                        tempArr.push(obj);
                    }
                })
                tempState[it]=tempArr;
            }
            // tempState.forEach((obj,idx)=>{
            //     if(obj.id==item.id)
            //     {
            //         tempState[idx]={};
            //     }
            // })
            setRank(tempState);
            //added here
            let tempArr=[];
            tempState.forEach((subArr)=>{
                subArr.forEach((dish)=>{
                    tempArr.push(dish);
                })
            })
            setTotalSelected(tempArr);
        }
    }
    const history=useHistory();
    useEffect(()=>{
        console.log("from poll file:",foodApiData)
    },[])
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem("overAllRanks"))?.find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id))
        {
            setRank(JSON.parse(localStorage.getItem("overAllRanks")).find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id).rankList)
        }
    },[])
    return(
        <>
            <Bar clickedSaveSubmit={clickedSaveSubmit} clickSaveSubmitHandler={clickSaveSubmitHandler}/>
            <div className="container pb-4">
                <div className="row">
                    {foodApiData && foodApiData.map((item)=>{
                        return(
                            <Card item={item} rank={rank} handleRank={handleRank} key={item.id}
                            totalSelected={totalSelected} 
                            // handTotalSelected={handTotalSelected}
                            />
                        )
                    })}
                </div>
                
            </div>
            <ToastContainer/>
        </>
    )
}

export default Poll;