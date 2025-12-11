import express from "express"
import { deleteUser, getuser, getusers, profileposts, saveposts, updateUser } from "../controllers/user.js"
import { verifyuser } from "../middleware/verifyroute.js"

const router=express.Router()

router.put("/:id",verifyuser,updateUser)
router.get("/:id",verifyuser,getuser)
router.get("/",getusers)
router.delete("/:id",verifyuser,deleteUser)
router.post("/savepost",verifyuser,saveposts)
router.get("/profileposts/listposts",verifyuser,profileposts)

export default router