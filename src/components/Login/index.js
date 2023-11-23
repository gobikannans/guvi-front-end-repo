import React,{useState} from "react";
import {Link} from "react-router-dom"
import "./index.css"
const baseurl="https://guvi-auth-qf1t.onrender.com"


export default function Login(){
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
 const[errWord,setErrWord]=useState(false)
 const [errMsg,setErrMsg]=useState("")
   const token=window.localStorage.getItem("token")

   if(token!==null){
    window.location.href="./profile"
   }


   const  renderPasswordField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={event=>setPassword(event.target.value)}
              placeholder="Password"
            />
          </>
        )
      }
    
    const renderUsernameField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={email}
              onChange={event=>setEmail(event.target.value)}
              placeholder="Username"
            />
          </>
        )
      }  
   
    const submitForm=(e)=>{
        e.preventDefault();
        console.log(email,password)
        fetch(`${baseurl}/login-user`,{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                email,
                password,

            }),
            
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"UserRegister")
            if(data.status==="ok"){
                alert("login successful")
                window.localStorage.setItem("token",data.data);
                const userDetail={
                  userName:"",
                  gender:"",
                  dob:"",
                  mobile:""
                }
                const userDetails=JSON.stringify(userDetail)
                window.localStorage.setItem("userDetails",userDetails);

                window.location.href="./profile"
            }else{
              setErrWord(true)
              setErrMsg(data.error)
            }
        }) 

       
        
        
    }  



    return(
        <div className="login-container">
            <h1 className="title">GUVI Geeks</h1> 

        <form className="form-container" onSubmit={submitForm}>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          
          <div className="pre-btn-container">
            <button
              type="submit"
              className="pre-btn"
              >
                Login
            </button>
          </div>
          {errWord?<p style={{color:"red",fontSize:"8px"}}>{errMsg}</p>:""}

        <div className="create-acc">  
          <p>Create an account ?</p>
         <Link to="/signup"> 
          <button className="sign-acc">
            Sign Up
          </button>
          </Link>
        </div>  
        </form>
        </div>
    )
}