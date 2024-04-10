import { NextResponse } from "next/server";
import Property from "./../../../../models/property.model"
import connectDb from "../../../../config/db";

export const GET = async (request) => {

    connectDb();

    try {
        const featured = await Property.find({ is_featured: true }).sort({ createdAt: "desc"});
        
        if(!featured || featured.length === 0) {
            return NextResponse.json({ featured: [], success: false, message: "No featured property found" }, {status: 200});
        }

        return NextResponse.json({featured,  success: true, message: "", }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}