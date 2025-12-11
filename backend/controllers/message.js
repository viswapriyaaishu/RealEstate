import { prisma } from "../lib/prisma.js"

export const addmessage=async(req,res)=>{
    try{
        const chatid=req.params.id 

        const chat=await prisma.chat.findUnique({where:{id:chatid}})
        if(!chat){return res.status(403).json({message:"No chat found"})}
        const msg=await prisma.message.create({
            data:{
                content:req.body.content,
            userid:req.userid,
            chatid
            }
        })

        await prisma.chat.update({where:{id:chatid},data:{seenby:{set:[req.userid]},lastmsg:req.body.content}})

        res.status(200).json(msg)

    }
    catch(err){
        console.log(err)
    }
}