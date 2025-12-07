import mongoose from "mongoose";
import { exit } from "node:process"

export const connectDB = async () => {

    try{
        const connection = await mongoose.connect(process.env.DATABASE_URL)
        console.log((`Base de datos conectada: ${connection.connection.host} : ${connection.connection.port}`)) 

    } catch (error){
        console.log(error.message);
        exit(1);
    }
}