import { NextResponse } from "next/server";
import Property from "./../../../../models/property.model"
import connectDb from "../../../../config/db";

// GET REQUEST: /api/properties/:propertyId

export const GET = async (request, { params: { propertyId } }) => {

    try {

        await connectDb();

        if(!propertyId) {
            return NextResponse.json({ message: "PropertyId not found", success: false, message: "failed" }, {status: 400});
        }

        const property = await Property.findById(propertyId);

        if(!property) {
            return NextResponse.json({ message: "No property found",  success: false, message: "failed" }, {status: 400});
        }

        return NextResponse.json({ property, success: true, message: "success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}