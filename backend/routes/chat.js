import express from "express"
import { addchat, getchat, getchats, getnotificationcnt } from "../controllers/chat.js"
import { verifyuser } from "../middleware/verifyroute.js"

const router=express.Router()

router.post("/",verifyuser,addchat)
router.get("/",verifyuser,getchats)
router.get("/:id",verifyuser,getchat)
router.get("/notification/cnt",verifyuser,getnotificationcnt)


export default router