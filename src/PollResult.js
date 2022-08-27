import React, { useEffect, useState } from "react";
import Bar from "./Bar";

const rankScoreMap={1:30,2:20,3:10};
function rankify(A, n) 
{
    let R = [...Array(n)];
    for (let i = 0; i < n; i++) {
    let r = 1,s = 1;
    for (let j = 0; j < n; j++) {
        if (j != i && A[j] < A[i]) {r += 1;}
        if (j != i && A[j] == A[i]) {s += 1;}
    }
    R[i] = parseInt(r + parseFloat(s - 1) / parseFloat(2));
    }
    
    console.log(R);
    return R;
}
const PollResult=()=>{
    const [currentUserDishRank,setCurrentUserDishRank]=useState([]);
    const [overallResult,setOverallResult]=useState([[],[],[]]);
    const [curMap,setCurMap]=useState({});
    
    let map={};
    let currUserMap={};
    const [sortable,setSortable]=useState([]);
    useEffect(()=>{
        let currUserDishRanking=JSON.parse(localStorage.getItem("overAllRanks"))[JSON.parse(localStorage.getItem("overAllRanks")).length-1].rankList;
        let lenofarr=[];
        currUserDishRanking.forEach((subArr,idx)=>{
            subArr.forEach((ob)=>{
                lenofarr.push(idx+1);
            })
        })
        console.log("lenofarr:",lenofarr);
        rankify(lenofarr,3);
        let res=rankify(lenofarr,3);
        let residx=0;
        let storeArr=[];
        currUserDishRanking.forEach((subArr)=>{
            subArr.forEach((obj)=>{
                // console.log("Rank "+res[residx++],obj);
                let keyName="Rank "+res[residx++];
                let tempObj={[keyName]:obj.dishName}
                storeArr.push(tempObj);
            })
        })
        residx=0;
        // rankify();
        setCurrentUserDishRank(storeArr);
        console.log(currUserDishRanking);
        for(let indx=0;indx<currUserDishRanking.length;indx++)
        {
            currUserDishRanking[indx].forEach((eachObj)=>{
                // console.log("27:",eachObj.msg);
                if(currUserMap[eachObj.dishName])
                {
                    currUserMap[eachObj.dishName]=currUserMap[eachObj.dishName]+rankScoreMap[res[residx++]];
                }
                else
                {
                    currUserMap[eachObj.dishName]=0;
                    currUserMap[eachObj.dishName]=currUserMap[eachObj.dishName]+rankScoreMap[res[residx++]];
                }
            })
        }
        console.log("currUserMap::",currUserMap);
        setCurMap(currUserMap);
        console.log(curMap);
        localStorage.setItem("currUserMap",JSON.stringify(currUserMap));
        // ------
        let jsonOverallMapObj=JSON.parse(localStorage.getItem("overAllMap"));
        console.log("check jsonoverallmapobj::",jsonOverallMapObj);
        if(jsonOverallMapObj==null)
        {
            
            localStorage.setItem("overAllMap",JSON.stringify(currUserMap));
            return;
        }
        else
        {
            let localMap={};
            for(let key in jsonOverallMapObj)
            {
                localMap[key]=jsonOverallMapObj[key];
            }
            for(let key in currUserMap)
            {
                if(localMap[key])
                {
                    localMap[key]=localMap[key]+currUserMap[key];
                }
                else
                {
                    localMap[key]=currUserMap[key];
                }
            }
            map=localMap;
            localStorage.setItem("overAllMap",JSON.stringify(map));
            let soable = [];
            for (let e in map) {
                soable.push([e, map[e]]);
            }

            soable.sort(function(a, b) {
                return b[1] - a[1];
            });
            setSortable(soable);
        }
    },[]);

    return(
        <>
            <Bar/>
            <div className="container m-2 h3">Overall Result</div>
            <table className="table table-striped m-3 table-bordered" style={{width:"50vh"}}>
                <thead className="m-3">
                    <tr className="m-3">
                        <th scope="row" style={{width:"2%"}}>#</th>
                        <th style={{width:"6.66%"}}>Dish Name</th>
                    </tr>
                </thead>
                <tbody>{sortable.length?sortable.map((subArr,ix)=>{
                        console.log(ix,subArr);
                        return(
                            <tr key={ix} className="m-3">
                                <th>{ix+1}</th>
                                <td>{subArr[0]}</td>
                            </tr>
                        )
                    }):null
                }</tbody>
            </table>
            <div className="container m-2 h3">Your Selection</div>
            <table className="table table-striped m-3 table-bordered" style={{width:"50vh"}}>
                <thead className="m-3">
                    <tr className="m-3">
                        <th scope="row" style={{width:"2%"}}>#</th>
                        <th style={{width:"6.66%"}}>Dish Name</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(curMap).length!= 0 &&
                    Object.keys(curMap).map((k,ix)=>{
                        return(
                            <tr key={ix} className="m-3">
                                <th>{ix+1}</th>
                                <td>{k}</td>
                            </tr>
                        )
                    })
                                        
                    }
                </tbody>
            </table>
        </>
    )
}

export default PollResult;