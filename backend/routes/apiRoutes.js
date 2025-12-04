import express from "express"
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router=express.Router();

router.get("/test",rateLimiter,(req,res)=>{
    res.json({message:"Request Accepted"})
})

export default router