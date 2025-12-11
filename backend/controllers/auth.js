import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const MAX_AGE=1000*60*60*24*7
export const signup=async(req,res)=>{
    try{
       const {name,email,password}=req.body 
    const hashpwd=await bcrypt.hash(password,10)

       const newuser=await prisma.user.create({
        data:{name,email,password:hashpwd}
       })
       res.status(201).json({message:"Created new User",data:newuser})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to create user"})
    }
}

export const login=async(req,res)=>{
    try{
       const {email,password}=req.body 
       const user=await prisma.user.findUnique({where:{email}})
       if(!user){return res.status(404).json({message:"Invalid credentials"})}

       
    const verifypwd=await bcrypt.compare(password,user.password)
    if(!verifypwd){return res.status(404).json({message:"Invalid credentials"})}


    const token=jwt.sign({id:user.id,isadmin:user.isAdmin},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRESIN
    })
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:MAX_AGE
    }).status(200).json({data:{user},message:"Login successful"})

    

    
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to login"})
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token").status(200).json({message:"Logged out successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to logout"})
    }
}