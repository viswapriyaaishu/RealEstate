
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const updateUser=async(req,res)=>{
    try{
        const {password,profileimg,...inputs}=req.body 
        const id=req.params.id
        let hashpwd=null
        if(password)
        {hashpwd=await bcrypt.hash(password,10)}
        
        
        const curruser=req.userid 

        if(curruser!==id){return res.status(401).json({message:"Cannot update"})}

       

        const updateduser=await prisma.user.update({where:{id:curruser},data:{...(hashpwd && {password:hashpwd}),... inputs,...(profileimg && {password:hashpwd})}})

        const {password:pwd,...otherinfo}=updateduser
        res.status(200).json({...otherinfo})
    }
    catch(err){
        console.log(err)
        res.status(401).json({message:"Failed to update user"})
    }
}

export const getuser=async(req,res)=>{
    try{
        const id=req.params.id 
        const user=await prisma.user.findUnique({where:{id}})

        if(!user){return res.status(403).json({message:"User does not exist"})}

        const {password,isAdmin,...otherinfo}=user
        res.status(200).json({...otherinfo})
    }
    catch(err){
        res.status(403).json({message:"Cannot fetch user"})
    }
}

export const getusers=async(req,res)=>{
    try{
        const users=await prisma.user.findMany()

        res.status(200).json(users)
    }
    catch(err){
        res.status(403).json({message:"Error fetching users"})
    }
}

export const deleteUser=async(req,res)=>{
    try{
        const id=req.params.id
        const curruser=req.userid 

        if(curruser!==id){return res.status(401).json({message:"Cannot delete"})}

       

        await prisma.user.delete({where:{id}}) 
        res.status(200).json({message:"Successfully deleted user"})
    }
    catch(err){
        console.log(err)
        res.status(401).json({message:"Failed to delete user"})
    }
}

export const saveposts=async(req,res)=>{
    try{
        const id=req.body.postid
        const userid=req.userid
        const postsaved=await prisma.savedpost.findUnique({where:{userid_postid:{postid:id,userid}}})

        if(postsaved){
            const postsavedid=postsaved.id
            await prisma.savedpost.delete({where:{id:postsavedid}})
            res.status(200).json({message:"Post removed from the savedlist"})
        }
        else{
            const postcreate=await prisma.savedpost.create({data:{postid:id,userid}})
            res.status(200).json({message:"Post added to the savedlist"})
        }
    }
    catch(err){
        console.log(err)
    }
}

export const profileposts=async(req,res)=>{
    try{
        const userid=req.userid
       
        const myposts=await prisma.post.findMany({
            where:{userid:userid}
        })

        const savedposts=await prisma.savedpost.findMany({
         where:{ userid},
         include:{post:true}
        })

        res.status(200).json({myposts:myposts,savedposts:savedposts})
    }
    catch(err){
        console.log(err)
    }
}
