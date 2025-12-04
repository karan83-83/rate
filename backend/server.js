import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { dbConfig, sequelize } from "./config/dbConfig.js"
import router from "./routes/apiRoutes.js"

dotenv.config()

const app=express()

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","PUT","PATCH","DELETE"],
    credentials:true
}))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const PORT=process.env.PORT ||7000








app.use("/",router)

app.listen(PORT,()=>{
    console.log(`App is listen PORT no ${PORT}`)
    dbConfig();
})