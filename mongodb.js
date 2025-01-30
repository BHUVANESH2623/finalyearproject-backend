import mongoose from "mongoose";

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('MongoDB connected')
    } catch (error) {
        console.log("MongoDB connection failed");
    }
}

export default mongodb;