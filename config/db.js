
import mongoose from "mongoose";

let connected = false;

let MONGODB_URI = "";

if(process.env.NODE_ENV === "production") {
    MONGODB_URI = process.env.MONGODB_URI
} else {
    MONGODB_URI = process.env.MONGODB_URI_LOCAL;
}


const connectDb = async () => {


    if(!MONGODB_URI) {
        throw new Error("Invalid database string");
    }

    mongoose.set("strictQuery", true);

    if(connected) {
        console.log("Connection already established")
        return;
    }

    // Connect to database

    try {
        await mongoose.connect(MONGODB_URI)
        connected = true;
        console.log("Database connected established")
    } catch (error) {
        console.log(error)
    }

}

export default connectDb;