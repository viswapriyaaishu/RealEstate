import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import './Signup.scss'
import { useState } from "react"
import { Apirequest } from "../../lib/ApiReq"

export const Signup=()=>{
    const [err,seterror]=useState("")
    const navigate=useNavigate()
    const signupsubmithandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData(e.target)
        const {username,email,password}=Object.fromEntries(formdata)
        const res= await Apirequest.post("/auth/signup",{name:username,email,password})
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
       
        <div className="signup">
           <form className="signlcon" onSubmit={signupsubmithandler}>
             <div className="signupheading">Users Signup</div>
        <div>
            <input type="username" placeholder="Username" name="username"></input>
            <input type="email" placeholder="Email" name="email"></input>
            <input type="password" placeholder="Password" name="password"></input>
        </div>
        <button type='submit'>Register</button>
        <Link to='/signin' className="signuplink">Already have an account?</Link>
        <div>{err}</div>
           </form>
           <div className="signrcon">
            <img src="https://marketplace.canva.com/EAGTwK0wOTg/2/0/1600w/canva-black-and-white-minimalistic-real-estate-flat-illustrative-logo-afTi-1EmZtc.jpg"></img>
           </div>
        </div>
        </>
    )
}