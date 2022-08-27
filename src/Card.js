import React, { useEffect, useState } from "react";

const rankScoreMap={1:30,2:20,3:10};

const Card=({item,rank,handleRank,totalSelected,handTotalSelected})=>{
    const [numRank,setNumRank]=useState(0);
    const [dropClicked,setDropClicked]=useState(false);
    // const [currUserObjExists,setCurrUserObjExists]=useState({});
    // useEffect(()=>{
    //     if(JSON.parse(localStorage.getItem("overAllRanks")).find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id))
    //     {
    //         setCurrUserObjExists(JSON.parse(localStorage.getItem("overAllRanks")).find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id))
    //     }
    // },[])
    function calcRank(){
        console.log("inside calc rank")
        let rankValue=-1;
        rank.forEach((obj1,idx)=>
        {
            
            obj1.forEach((obj)=>
            {
                // setNumRank(idx+1);
                if(obj.id==item.id){
                    console.log("obj1::",obj1);
                    console.log("idx::",idx);
                    console.log("obj::",obj);
                    console.log("item.id::",item.id);
                    rankValue=idx+1;
                }
            })
        }
        )
        return rankValue;
    }
    useEffect(()=>{
        function findRankInt(item)
        {
            let val=0;
            for(let idx=0;idx<rank.length;idx++)
            {
                rank[idx].forEach(element => {
                    if(element.id==item.id)
                    {
                        // setNumRank(idx+1);
                        val=idx+1;
                        console.log("set num rank,num rank::",numRank,idx+1,val);
                        return;
                    }
                });
                // if(rank[idx].id==item.id)
                // {
                //     setNumRank(idx+1);
                //     return;
                // }
            }
            if(val==0)
            {
                setNumRank(-1);
            }
            else
            {
                setNumRank(val);
            }
        }
        findRankInt(item);
    },[dropClicked])
    return(
        <div className="col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch mt-2" key={item.id}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{item.dishName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.description}</h6>            
                </div>
                {/* <div className="d-flex align-items-baseline justify-content-center mb-2">
                        <div className="btn-group" role="group" aria-label="Rank">
                                <button type="radio" class="btn btn-outline-primary">Rank 1</button>
                                <button type="radio" class="btn btn-outline-primary">Rank 2</button>
                                <button type="radio" class="btn btn-outline-primary">Rank 3</button>
                        </div>
                </div> */}
                {/* {
                    !JSON.parse(localStorage.getItem("overAllRanks")).find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id) &&
                    <button id={`btnGroupDrop+${item.id}`} type="button" className="btn btn-outline-primary dropdown-toggle m-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {
                        rank.find((obj1)=>
                            obj1.find((obj)=>obj.id==item.id)
                        ) && numRank!=-1?`Rank ${numRank}`:`Rank`
                    }
                    </button>
                }
                {
                    JSON.parse(localStorage.getItem("overAllRanks")).find((elem)=>elem.userId==JSON.parse(localStorage.getItem("loggedInUser")).id) &&
                    currUserObjExists.rankList.forEach((subArr,idx)=>{
                        subArr.forEach((dish)=>{
                            if(item.id==dish.id)
                            {
                                return(
                                    <button id={`btnGroupDrop+${item.id}`} type="button" className="btn btn-outline-primary dropdown-toggle m-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            rank.find((obj1)=>
                                                obj1.find((obj)=>obj.id==item.id)
                                            ) && numRank!=-1?`Rank ${numRank}`:`Rank`
                                        }
                                    </button>
                                )
                            }
                        })
                    })
                } */}
                <button id={`btnGroupDrop+${item.id}`} type="button" className="btn btn-outline-primary dropdown-toggle m-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {
                        rank.find((obj1,idx)=>obj1.find((obj)=>{
                            // setNumRank(idx+1);
                            return obj.id==item.id
                        }))
                        //  && numRank!=-1
                         ?`Rank ${
                            calcRank()
                         }`:`Rank`
                    }
                    </button>
                    <div className="dropdown-menu" aria-labelledby={`btnGroupDrop+${item.id}`}>
                    <a className="btn dropdown-item" onClick={()=>{
                        if(totalSelected.find((obj)=>obj.id==item.id))
                        {
                            setDropClicked(!dropClicked);
                            handleRank(item,1);
                            // handTotalSelected(item);
                            return;
                        }
                        // if(totalSelected.length>2)
                        if(rank.flat(5).length==3)
                        {
                            if(totalSelected.find((obj)=>obj.id==item.id))
                            {
                                setDropClicked(!dropClicked);
                                handleRank(item,1);
                                // handTotalSelected(item);
                                return;
                            }
                            alert("Maximum 3 dishes can be voted.")
                            return;
                        }
                        setDropClicked(!dropClicked);
                        handleRank(item,1);
                        // handTotalSelected(item);
                    }
                    }>Rank 1</a>
                    <a className="btn dropdown-item" onClick={()=>{
                        if(totalSelected.find((obj)=>obj.id==item.id))
                        {
                            setDropClicked(!dropClicked);
                            handleRank(item,2);
                            // handTotalSelected(item);
                            return;
                        }
                        // if(totalSelected.length>2)
                        if(rank.flat(5).length==3)
                        {
                            if(totalSelected.find((obj)=>obj.id==item.id))
                            {
                                setDropClicked(!dropClicked);
                                handleRank(item,2);
                                // handTotalSelected(item);
                                return;
                            }
                            alert("Maximum 3 dishes can be voted.")
                            return;
                        }
                        setDropClicked(!dropClicked);
                        handleRank(item,2);
                        // handTotalSelected(item);
                    }
                    }>Rank 2</a>
                    <a className="btn dropdown-item" onClick={()=>{
                        if(totalSelected.find((obj)=>obj.id==item.id))
                        {
                            setDropClicked(!dropClicked);
                            handleRank(item,3);
                            // handTotalSelected(item);
                            return;
                        }
                        // if(totalSelected.length>2)
                        if(rank.flat(5).length==3)
                        {
                            if(totalSelected.find((obj)=>obj.id==item.id))
                            {
                                setDropClicked(!dropClicked);
                                handleRank(item,3);
                                // handTotalSelected(item);
                                return;
                            }
                            alert("Maximum 3 dishes can be voted.")
                            return;
                        }
                        setDropClicked(!dropClicked);
                        handleRank(item,3);
                        // handTotalSelected(item);
                    }
                    }>Rank 3</a>
                    <a className="btn dropdown-item" onClick={()=>{
                        setDropClicked(!dropClicked);
                        handleRank(item,0);
                        // handTotalSelected(item,0);
                    }
                    }>No Rank</a>
                </div>
            </div>
        </div>
    )
}

export default Card;