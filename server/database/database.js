import mongoose from "mongoose";

const connectDB = () =>{
    console.log(process.env.MONGO_URI,"process.env.MONGO_URI")
    
    try {
        const connection = mongoose.connect(String(process.env.MONGO_URI));
        console.log("Connect to MongoDB success");
        return connection;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB;