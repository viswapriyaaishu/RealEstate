import { createContext } from "react"
import { useState,useEffect } from "react"

export const Authcontext=createContext()

export const Authprovider=({children})=>{

    const [user,setuser]=useState(JSON.parse(localStorage.getItem("user")))

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(user))
    },[user])
    const updateuser=(data)=>{
        setuser(data)
    }

    return(
        <Authcontext.Provider value={{user,updateuser}}>
            {children}
        </Authcontext.Provider>
    )
}