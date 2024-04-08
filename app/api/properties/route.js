
import { NextResponse } from "next/server";
import Property from "./../../../models/property.model"
import connectDb from "../../../config/db"

// GET REQUEST: /api/properties
export const GET = async (request) => {

    try {
        await connectDb();

        const properties = await Property.find({}).sort({ createdAt: "desc" });

        if(properties.length === 0) {
            return NextResponse.json({ properties: [],  success: true, message: "Success" }, {status: 200});
        }

        return NextResponse.json({ properties, success: true, message: "Success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}



export const POST = async () => {}