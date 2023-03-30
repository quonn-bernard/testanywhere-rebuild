import mongoose from "mongoose";
import colors from "colors";
import * as dotenv from 'dotenv' 
dotenv.config()

const connectToDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to DB ${connection.connection.host}`.bgBlue.white.bold)
    }catch (error){
        console.log(error)
        process.exit(1)
    }
}

export default connectToDB
