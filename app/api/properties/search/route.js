import { NextResponse } from "next/server";
import Property from "./../../../../models/property.model"
import connectDb from "../../../../config/db";

// GET REQUEST: /api/properties/search
export const GET = async (request) => {

    try {

        await connectDb();

        const { searchParams } = new URL(request.url);

        const location = searchParams.get("location");
        const propertyType = searchParams.get("propertyType");

        const locationPattern = new RegExp(location, 'i');

        let query = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { "location.street": locationPattern },
                { "location.city": locationPattern },
                { "location.state": locationPattern },
                { "location.zipcode": locationPattern },
                { name: locationPattern },
            ]
        };

        if(propertyType && propertyType !== "All") {
            const typePattern = new RegExp(propertyType, 'i');
            query.type = typePattern
        }

        const properties = await Property.find(query).sort({ createdAt: "desc" });

        if(!properties || properties.length === 0) {
            return NextResponse.json({ properties: [], success: false, message: "No property found" }, {status: 200});
        }


        return NextResponse.json({properties,  success: true, message: "", }, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}