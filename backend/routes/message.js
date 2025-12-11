import express from "express"
import { addmessage } from "../controllers/message.js"
import { verifyuser } from "../middleware/verifyroute.js"

const router=express.Router()

router.post("/:id",verifyuser,addmessage)
export default router