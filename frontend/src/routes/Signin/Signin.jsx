import { Link, Navigate, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import './Signin.scss'
import { Apirequest } from "../../lib/ApiReq"
import { useContext } from "react"
import { Authcontext } from "../../context/Authcontext"
import { useState } from "react"


export const Signin=()=>{
    const navigate=useNavigate()
    const {user,updateuser}=useContext(Authcontext)
    const [error,seterror]=useState("")
    const signinsubmithandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData(e.target)
            const {email,password}=Object.fromEntries(formdata)
           const res= await Apirequest.post("/auth/signin",{email,password})
        try{
            
            if(res.data){
                updateuser(res.data);
                navigate("/")
            }

        
        }
        catch(err){
            seterror(res.response.data.error)
            console.log(res.response.data.error)
        }
        
    }
    return (

        <>
       
        <div className="signin">
           <form className="signlcon" onSubmit={signinsubmithandler}>
             <div className="signinheading">Users Sign In</div>
        <div>
            <input type="email" name="email" placeholder="Email"></input>
            <input type="password" name="password" placeholder="Password"></input>
        </div>
        <button type="submit">Login</button>
        <Link to='/signup' className="signuplink">Don't have an account?</Link>
        <div>{error}</div>
           </form>
           <div className="signrcon">
            <img src="https://marketplace.canva.com/EAGTwK0wOTg/2/0/1600w/canva-black-and-white-minimalistic-real-estate-flat-illustrative-logo-afTi-1EmZtc.jpg"></img>
           </div>
        </div>
        </>
    )
}