import { useContext } from "react";
import { createContext,useEffect,useState } from "react";
import {io} from "socket.io-client"
import { Authcontext } from "./Authcontext";

export const SocketContext=createContext()

export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    let {user}=useContext(Authcontext)
     user=user?.data?.user
    
    useEffect(()=>{
        const s=io("http://localhost:3000")
        setSocket(s)
    return ()=>{s.disconnect()}
    },[])
    useEffect(()=>{if(user && socket){socket.emit("adduser",user.id)}},[socket,user])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}