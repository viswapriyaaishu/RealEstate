import { prisma } from "../lib/prisma.js"

export const addchat=async(req,res)=>{
    try{
        const receiverid=req.body.receiverid 

        const chat=await prisma.chat.create({
            data:{userids:[req.userid,receiverid]}
        })

        res.status(200).json(chat)
    }
    catch(err){
        console.log(err)
    }
}

export const getchats=async(req,res)=>{
    try{
        const chats=await prisma.chat.findMany({where:{userids:{hasSome:[req.userid]}}})

        for(const chat of chats){
            let uid=chat.userids.find((id)=>id!==req.userid)

            let user=await prisma.user.findUnique({where:{id:uid},select:{id:true,name:true,photoimg:true}})

            chat.receiver=user
        }
        res.status(200).json(chats)
    }
    catch(err){
        console.log(err)
    }
}

export const getchat=async(req,res)=>{
    try{
        const id=req.params.id 

        const chat=await prisma.chat.findUnique({where:{id},include:{messages:{orderBy:{createdAt:"asc"}}}})
       

       if(!chat.seenby.includes(req.userid)){await prisma.chat.update({where:{id},data:{seenby:{push:[req.userid]}}})}

        res.status(200).json(chat)
    }
    catch(err){
        console.log(err)
    }
}
export const getnotificationcnt=async(req,res)=>{
    try{
        const notificationo=await prisma.chat.count({
            where:{
                userids:{hasSome:[req.userid]},
                 NOT:{
                seenby:{hasSome:[req.userid]}
            }
            }
        })

        res.status(200).json(notificationo)
    }
    catch(err){
        console.log(err)
    }
}
