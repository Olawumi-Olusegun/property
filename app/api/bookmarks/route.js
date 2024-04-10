
import { NextResponse } from "next/server";
import User from "./../../../models/user.model"
import Property from "./../../../models/property.model"
import connectDb from "../../../config/db";
import { getSessionUser } from "./../../../utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET REQUEST: /api/bookmarks
export const GET = async (request) => {

    try {

        await connectDb();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, {status: 400});
        }
    
        const {userId} = sessionUser;

        const user = await User.findById(userId);

        const properties = await Property.find({ _id: { $in: user.bookmarks } });

        return NextResponse.json({properties,  success: true, message: "", }, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}

// POST REQUEST: /api/bookmarks
export const POST = async (request) => {

    try {

        await connectDb();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, {status: 400});
        }
    

        const {userId} = sessionUser;

        const { propertyId } = await request.json();

        if(!propertyId) {
            return NextResponse.json({ success: false, message: "Property ID is required" }, {status: 400});
        }

        const user = await User.findById(userId);
        let message;

        let isBookmarked = user.bookmarks.includes(propertyId);

        if(isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = "Bookmark removed";
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId);
            message = "Bookmark added";
            isBookmarked = true;
        }

        await user.save();

        return NextResponse.json({isBookmarked,  success: true, message, }, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}