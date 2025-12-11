import jwt from "jsonwebtoken"

export const verifyuser=async(req,res,next)=>{
    const token=req.cookies.token

    if(!token){return res.status(403).json({message:"Not Authenticated"})}

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){return res.status(403).json({message:"Token invalid"})}

        req.userid=payload.id 
        next()
    })

    
}

export const verifyadmin=async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){return res.status(403).json({message:"Not authenticated"})}

        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err){return res.status(403).json({message:"Token invalid"})}
            if(!payload.isadmin){return res.status(403).json({message:"Not authorized"})}

            req.userid=payload.id 
            next()
        })
    }
    catch(err){
        res.status(404).json({message:"Error verifying user"})
    }
}