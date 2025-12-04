import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";


const RateLimit=sequelize.define("RateLimit",{
    key:{
        type:DataTypes.STRING,
        unique:true
    },
    count:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    lastReset:{
        type:DataTypes.BIGINT
    }
},{
    timestamps:true
})

export default RateLimit