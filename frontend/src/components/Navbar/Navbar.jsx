import "./Navbar.scss"
import { useState } from "react"
import {motion} from "framer-motion"
import { useContext } from "react"
import { Authcontext } from "../../context/Authcontext"
import { Link } from "react-router-dom"
import { notificationStore } from "../../context/notificationStore"
export const Navbar=()=>{
    const [open,setopen]=useState(false)

    
    const [darkMode,setdarkMode]=useState(false)
    const [sys,setsys]=useState(false)
    let {user}=useContext(Authcontext)
    if(user!=null)
   {

    
    user=user?.data?.user}
    const fetchnotification=notificationStore(state=>state.fetchnotification)
    const notificationcnt=notificationStore(state=>state.notificationnum)

    if(user){
        fetchnotification()
    }
    return(
        <div className="nav">
            <div className="leftnav">
                <Link to="/" className="logo">
                    <img src="https://marketplace.canva.com/EAGTwDkzzi8/2/0/1600w/canva-beige-and-brown-minimalistic-real-estate-flat-illustrative-logo-eexA7JVK_9A.jpg"></img>
                    <div>RealEstate</div></Link>
                <Link to="/" className="navsub">Home</Link>
                <Link to="/" className="navsub">About</Link>
                <Link to="/" className="navsub">Contact</Link>
                <Link to="/" className="navsub">Agents</Link>
                {/* <div className={`mode ${darkMode}?'lmode:'dmode'`} onClick={()=>setdarkMode(prev=>!prev)}>mode</div>
                <div className={`sys ${sys}?'sysip:'nsysip'`} onClick={()=>setsys(prev=>!prev)}>sys</div> */}
            </div>
            
            <div className="rightnav">
                {
                    user!=null?<div className='user'>
                   <div>
                     <img src={user?.photoimg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZF9csEvwx9SzpwjfwqhePzROYU9Qlfzd64A&s" } className="profileimg"></img>
                    <span>{user.name}</span>
                    <div className="profilenav"><Link to="/profile">Profile {user ?<div className={`${notificationcnt>0 ?"notificationno":""}`}>{notificationcnt>0 ?notificationcnt:""}</div>:""}</Link></div>
                    </div></div>:<><Link to="/signin">Sign In</Link>
                <Link to="/signup" className="signuplink">Sign Up</Link></>
                }
                <div className="menuicon" onClick={()=>setopen(prev=>!prev)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`menu ${open? "active":""}`}>
                    <Link to='/' className="sidelinks">Home</Link>
                    <Link to='/' className="sidelinks">About</Link>
                    <Link to='/' className="sidelinks">Contact</Link>
                    <Link to='/' className="sidelinks">Agents</Link>
                    <Link to='/signin' className="sidelinks">Sign In</Link>
                    <Link to='/signup' className="sidelinks">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}