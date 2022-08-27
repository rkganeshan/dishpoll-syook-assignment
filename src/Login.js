import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

let userData=require("./users.json");
const Login=()=>{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    useEffect(()=>{
        console.log(userData);
    },[])
    const wrongCredentials = () => {
        toast.error('Wrong Credentials', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const loginSuccess = () => {
        toast.success('Login Success', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const handleLogIn=(e)=>{
        e.preventDefault();
        let userExists=userData.find((user)=>{
            if(user.username==userName && user.password==password)
            {
                return user;
            }
        })
        if(!userExists)
        {
            wrongCredentials();
            setUserName("");
            setPassword("");
        }
        else
        {
            loginSuccess();
            localStorage.setItem("loggedInUser",JSON.stringify(userExists));
            
            setTimeout(()=>{
                setUserName("");
                setPassword("");
                history.push("/main");
                window.location.reload();
            },1000);
        }
    }
    return(
       <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                <div className="card mb-3">
                    <div className="d-flex flex-lg-row flex-column">
                    <img className="card-img-top img-thumbnail" src={require('./hamburger.jpg')} alt="Hamburger Image" 
                        // size={"0.2rem"}
                        height={"200vh"}
                        width={"200vh"}
                    />
                    <div className="card-body container">
                        <form>
                            <div className="form-group">
                                <label htmlFor="userName">Username</label>
                                <input type="text" className="form-control" id="userName" 
                                aria-describedby="emailHelp" placeholder="Enter username"
                                value={userName}
                                onChange={(e)=>{
                                    setUserName(e.target.value);
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}
                                />
                            </div>
                            <button className="btn btn-primary btn-block"
                            onClick={(e)=>handleLogIn(e)}
                            >Log In</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
        <ToastContainer/>
       </>
    )
}


export default Login;