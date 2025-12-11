import express from "express"
import { createpost, deletePost, getPost, getPosts, updatepost } from "../controllers/post.js"
import { verifyuser,verifyadmin } from "../middleware/verifyroute.js"

const router=express.Router()

router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",verifyadmin,createpost)
router.put("/:id",verifyadmin,updatepost)
router.delete("/:id",verifyadmin,deletePost)

export default router