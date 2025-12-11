import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import { useContext } from "react"
import { Authcontext } from "../../context/Authcontext"
import { Signin } from "../Signin/Signin"
import { Link } from "react-router-dom"

export const Layout=()=>{
    return(
        <div>
        <div className="navcon">
            <Navbar></Navbar>

        </div>
        <div>
            <Outlet></Outlet>
        </div>
        </div>
    )
}

export const ProtectedLayout=()=>{

    const {user}=useContext(Authcontext)
    return !user? <Navigate to='/signin'></Navigate>: (
       <div>
         <div className="navcon"><Navbar>

        </Navbar></div>
        <div>
            <Outlet/>
        </div>
       </div>
    )
}