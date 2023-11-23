import React,{useState} from "react";
import {Link} from "react-router-dom"
import "./index.css"
const baseurl="https://guvi-auth-qf1t.onrender.com"


export default function Login(){
   const [username,setUserName]=useState("")
   const [password,setPassword]=useState("")
   const [email,setEmail]=useState("")
   const [cpassword,setCPassword]=useState("")
   const [errpassword,setErrpassword]=useState(false)
   const[errWord,setErrWord]=useState(false)

   const token=window.localStorage.getItem("token")

   if(token!==null){
    window.location.href="./profile"
   } 


   
    
    const renderUsernameField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={e=>setUserName(e.target.value)}
              placeholder="Username"
            />
          </>
        )
      }  

      const renderEmailField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="username-input-field"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="Email"
            />
          </>
        )
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
              onChange={e=>setPassword(e.target.value)}
              placeholder="Password"
            />
          </>
        )
      }
      
      const renderCPasswordField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              className="password-input-field"
              value={cpassword}
              onChange={e=>setCPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </>
        )
      }


   
    const submitForm=(event)=>{
        event.preventDefault()
        console.log(username,email,password,cpassword)
        if(username!=="" && email!=="" && password===cpassword){
            setErrWord(false)
            setErrpassword(false)
            fetch(`${baseurl}/register`,{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                username,
                email,
                password,
                cpassword
            }),
            
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"UserRegister")
            if(data.error!=="User Exists"){
              window.location.href="./"
            }
        })

        }
        else if(cpassword!==password){     
            setErrpassword(true)   
    }else{
        setErrWord(true)
    }
    }  



    return(
        <div className="login-container">
            <h1 className="title">GUVI Geeks</h1> 

        <form className="signup-form-container" onSubmit={submitForm}>
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderEmailField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <div className="input-container">{renderCPasswordField()}</div>
          {errpassword?<p style={{color:"red",fontSize:"8px"}}>Password doesn't match</p>:""}
          <div className="pre-btn-container">
            <button
              type="submit"
              className="pre-btn"
              >
                Register
            </button>
          </div>
          {errWord?<p style={{color:"red",fontSize:"8px"}}>*Please fill all Details</p>:""}

        <div className="create-acc">  
          <p>Already have an account ?</p>
         <Link to="/">
          <button className="sign-acc">
            Login
          </button>
          </Link>   
        </div>  
        </form>
        </div>
    )
}