import React,{useState,useEffect} from "react";
import "./index.css"

const baseurl="https://guvi-auth-qf1t.onrender.com"

export default function Profile(){
    const strval=window.localStorage.getItem("userDetails")
    const strparse=JSON.parse(strval)
   console.log(strval)
    const [val,setVal]=useState("")
    const [name,setName]=useState(strparse.userName)
    const [gender,setGender]=useState(strparse.userGender)
    const [dob,setDob]=useState(strparse.userDob)
    const [mobile,setMobile]=useState(strparse.userMobile)


    useEffect(()=>{
        fetch(`${baseurl}/userData`,{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                token:window.localStorage.getItem("token")
            }),
            
        }).then((res)=>res.json())
        .then((data)=>{
            setVal(data.data)
        }) 
    },[val])

    const onLogout=()=>{
        window.localStorage.clear()
        window.location.href="./"
    }

   const updateDetails=()=>{
    const userDetails={
        userName:name,
        userGender:gender,
        userDob:dob,
        userMobile:mobile
    }

    const strDetails=JSON.stringify(userDetails)

    window.localStorage.setItem("userDetails",strDetails)
   }


    return(
        <div className="profilebg">
            <div className="profile-container">
                <div className="inputs">
                    <p>Name</p>
                    <input value={name} onChange={e=>setName(e.target.value)} className="info" type="text" />
                </div>
                <div className="inputs">
                    <p>Email</p>
                    <p>{val.email}</p>
                </div>
                <div className="inputs">
                    <p>Gender</p>
                    <input value={gender} onChange={e=>setGender(e.target.value)} className="info" type="text" />
                </div>
                <div className="inputs">
                    <p>DOB</p>
                    <input value={dob} onChange={e=>setDob(e.target.value)} className="info" type="date" />
                </div>
                <div className="inputs">
                    <p>Mobile</p>
                    <input value={mobile} onChange={e=>setMobile(e.target.value)} className="info" type="number"/>
                </div>
                <button className="logoutbtn" onClick={updateDetails}>update</button>

                <button className="logoutbtn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )
}



