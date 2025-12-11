import {create} from "zustand"
import { Apirequest } from "../lib/ApiReq"

export const notificationStore=create((set)=>({
    notificationnum:0,
    fetchnotification:async()=>{
       const res= await Apirequest.get("/chats/notification/cnt")
        set({notificationnum:res.data})
    },
    decreasenotification:()=>{set(prev=>({notificationnum:prev.notificationnum-1}))},
    reset:()=>{set({notificationnum:0})}
}))