
import { NextResponse } from "next/server";
import User from "./../../../../models/user.model"
import connectDb from "../../../../config/db";
import { getSessionUser } from "./../../../../utils/getSessionUser";

export const dynamic = "force-dynamic";

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

        let isBookmarked = user.bookmarks.includes(propertyId);


        return NextResponse.json({isBookmarked,  success: true, message: "", }, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}