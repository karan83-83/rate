import RateLimit from "../models/rateModel.js";

export const rateLimiter=async(req,res,next)=>{

    const userId=req.headers["userId"]
    const ip=req.headers["x-forwarded-for"]||req.ip;
    if(userId){
        return res.status(400).json({message:"User ID required"})
    }
    const currentTime=Date.now()
    const windowSize=60*1000 

    async function checkLimit(key,maxLimit){
        let record=await RateLimit.findOne({where:{key}});
        if(!record){
            record=await RateLimit.create({
                key,count:1,lastReset:currentTime
            })
        }else{
            if(currentTime-record.lastReset>windowSize){
                record.count=1;
                record.lastReset=currentTime;

            }else{
                record.count +=1;
            }
            await record.save();
        }

      return record.count <= maxLimit
    }

    const userAllowed=await checkLimit(`user:${userId}`,5);
    if(!userAllowed){
        return res.status(420).json({message:"User rate limit exceeded"})
    }
    const ipAllowed=await checkLimit(`ip:${ip}`,20);
    if(!ipAllowed){
        return res.status(420).json({message:"IP rate limit exceeded"})
    }
    next();
    
}