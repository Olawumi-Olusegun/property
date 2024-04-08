
import mongoose from "mongoose";

let connected = false;


const connectDb = async () => {
    mongoose.set("strictQuery", true);

    if(connected) {
        console.log("Connection already established")
        return;
    }

    // Connect to database

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true;
        console.log("Database connected established")
    } catch (error) {
        console.log(error)
    }

}

export default connectDb;