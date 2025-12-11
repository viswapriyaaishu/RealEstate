import { prisma } from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const createpost = async (req, res) => {
    try {
        const userid = req.userid
        const newpost = await prisma.post.create({ data: { ...req.body.postform, userid, postdetail: { create: req.body.postdetail } } })
        res.status(201).json(newpost)

    }
    catch (err) {
        console.log(err)
        res.status(403).json({ message: err })
    }
}
export const updatepost = async (req, res) => {
    try {
        const id = req.params.id

        const post = await prisma.post.findUnique({ where: { id } })

        const userid = req.userid

        if (userid != post.userid) {
            return res.status(403).json({ message: "Cannot update post" })
        }

        const newpost = await prisma.post.update({ where: { id: post.id }, data: { ...req.body.postform, userid, postdetail: req.body.postdetail } })

        res.status(200).json(newpost)

    }
    catch (err) {
        res.status(403).json({ message: "Error updating post" })
    }
}

export const getPost = async (req, res) => {
    try {
        const id = req.params.id
        const post1 = await prisma.post.findUnique({
            where: { id }, include: {
                postdetail: true, user: {
                    select: { name: true, photoimg: true }
                }
            }
        })

        if(!post1){return res.status(403).json({message:"Post not found"})}
        let userid=null
        const token=req.cookies.token 
        if(!token){userid=null}
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
            if(err){userid=null}
            else{
                userid=payload.id
            }
        })

        const poststatus=await prisma.savedpost.findUnique({
           where:{ userid_postid:{userid,
            postid:post1.id}}
        })

        res.status(200).json({...post1,postsavestatus:poststatus?true:false})
    }
    catch (err) {
        res.status(403).json({ message: err })
    }
}

export const getPosts = async (req, res) => {
    try {
        const query = req.query
        const posts = await prisma.post.findMany({
            where:
            {
                city: query.city || undefined,
                type: query.type || undefined,
                price: {
                    gte: parseInt(query.minprice) || 0,
                    lte: parseInt(query.maxprice) || 9999999999999
                },
                bedroom: {gte:parseInt(query.bedroom) || 1},
                property:query.property || undefined
            }
        })

        res.status(200).json(posts)
    }
    catch (err) {
        console.log(err)
        res.status(403).json({ message: err })
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id

        const tokenid = req.userid

        const post1 = await prisma.post.findUnique({ where: id })
        if (!post1) { return res.status(401).json({ message: "Cannot delete" }) }

        if (post1.userid != tokenid) { return res.status(403).json({ message: "Not authorized to delete post" }) }

        await prisma.post.delete({ where: { id } })
        res.status(200).json({ message: "Post deleted successfully" })
    }
    catch (err) {
        res.status(403).json({ message: "Error deleting post" })
    }
}

