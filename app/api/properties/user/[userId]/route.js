import { NextResponse } from "next/server";
import connectDb from "./../../../../../config/db";
import Property from "./../../../../../models/property.model";

// GET REQUEST: /api/properties/user/:userId
export const GET = async (request, { params: { userId } }) => {

    try {

        await connectDb();

        

        if(!userId) {
            return NextResponse.json({ user: null,  success: false, message: "User ID is required" }, {status: 400});
        }

        const properties = await Property.find({ owner: userId }).sort({ createdAt: "desc" });

        if(!properties) {
            return NextResponse.json({ properties: null,  success: false, message: "failed" }, {status: 400});
        }

        return NextResponse.json({ properties, success: true, message: "success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}
