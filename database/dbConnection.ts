import mongoose from "mongoose";

export const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 5000 
        })
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("connected successfully")
        })
           
        connection.on('error',()=>{
            console.log("error");
            process.exit()
        })
    }catch(error){
        console.log("went wrong", error);
    }
}