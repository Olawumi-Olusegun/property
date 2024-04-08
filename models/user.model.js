import { Schema, model, models, } from "mongoose";

const userSchema = new Schema({
    email: { 
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, "Email already exist"],
        required: [true, "Email is required"],
    },
    username: { 
        type: String,
        trim: true,
        required: [true, "Username is required"],
    },
    image: {
        type: String,
        trim: true,
    },
    bookmarks: [
        {
            types: Schema.Types.ObjectId,
            ref: "Property"
        }
    ]
}, { timestamps: true });


const User = models.User || model("User", userSchema);

export default User;