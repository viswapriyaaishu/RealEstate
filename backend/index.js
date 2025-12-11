import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import {Server} from "socket.io"
import authrouter from "./routes/auth.js"
import userrouter from "./routes/user.js"
import postrouter from "./routes/post.js"
import chatrouter from "./routes/chat.js"
import messagerouter from "./routes/message.js"


dotenv.config()
const app=express()

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())

app.use("/auth",authrouter)
app.use("/user",userrouter)
app.use("/posts",postrouter)
app.use("/chats",chatrouter)
app.use("/messages",messagerouter)


const server=http.createServer(app)

let usersarr=[]
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

const getuser=(userid)=>{
    return usersarr.find(user=>user.userid==userid)
}
io.on("connection",(socket)=>{
    console.log("socketid ",socket.id)
    socket.on("adduser",(userid)=>{
        let user=usersarr.find(user=>user.userid==userid)

        if(!user){usersarr.push({userid,socketid:socket.id})}
    })

    socket.on("disconnect",()=>{
        usersarr=usersarr.filter(user=>user.socketid!=socket.id)
    })

    socket.on("sendmsg",({data,receiver})=>{
        const user=getuser(receiver)
        if(user)
        {io.to(user.socketid).emit("receivemsg",data)}
    })
})

server.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})

