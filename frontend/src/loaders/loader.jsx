
import { Apirequest } from "../lib/ApiReq.jsx"
import {defer} from "react-router"

export const postloader=async({request,params})=>{
const query=`${params.id}`
const res=Apirequest.get("/posts/"+query)
return defer({
    response:res
})


}

export const postsloader=async({request,params})=>{
    // console.log(request)
    const query=request.url.split("?")[1]

    const res=Apirequest.get("/posts?"+query)

    return defer({
        response:res
    })
}

export const profileloader=async({request,params})=>{
    const data=Apirequest.get("/user/profileposts/listposts")
    const chats=Apirequest.get("/chats")

    return defer({
        response:data,
        chatres:chats
    })
}

