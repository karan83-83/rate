import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {    port:process.env.DB_PORT,
        host:process.env.DB_HOST,
       
        dialect:"mysql"
    }
)

const dbConfig=async()=>{
    try {

        await sequelize.authenticate();
        
        console.log("DB Connected Successfully")
        await sequelize.sync({alter:true})
        console.log("DB Sync Successfully")
        
    } catch (error) {
        console.log("DB Connection Failed",error)
        process.exit(1)
    }
} 

export {dbConfig,sequelize}