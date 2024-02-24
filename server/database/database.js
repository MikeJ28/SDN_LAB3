import mongoose from "mongoose";

const connectDB = () =>{
    try {
        const connection = mongoose.connect(String(process.env.MONGO_URI));
        return connection;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB;