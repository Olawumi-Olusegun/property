import { NextResponse } from "next/server";
import Property from "./../../../../models/property.model"
import connectDb from "../../../../config/db";
import { getSessionUser } from "../../../../utils/getSessionUser";

// GET REQUEST: /api/properties/:propertyId

export const GET = async (request, { params: { propertyId } }) => {

    try {

        await connectDb();

        if(!propertyId) {
            return NextResponse.json({ message: "PropertyId not found", success: false, }, {status: 400});
        }

        const property = await Property.findById(propertyId);

        if(!property) {
            return NextResponse.json({ message: "No property found",  success: false, }, {status: 400});
        }

        return NextResponse.json({ property, success: true, message: "success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}


// PUT REQUEST: /api/properties/:propertyId
export const PUT = async (request, { params: { propertyId } }) => {

    try {
        await connectDb();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, {status: 400});
        }

        const {userId} = sessionUser;

        const formData = await request.formData();

        //Access all values from amenities and images
        const amenities = formData.getAll("amenities");

        const existingProperty = await Property.findById(propertyId);

        if(!existingProperty) {
            return NextResponse.json({ property: null,  success: false, message: "Property does not exist" }, {status: 404});
        }

        if(existingProperty.owner.toString() !== userId) {
            return NextResponse.json({ property: null,  success: false, message: "Unauthorized" }, {status: 401});
        }

        // Create property object for database;

        const propertyData = {
            type: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),
            location: {
                street: formData.get("location.street"),
                city: formData.get("location.city"),
                state: formData.get("location.state"),
                zipcode: formData.get("location.zipcode"),
            },
            beds: formData.get("beds"),
            baths: formData.get("baths"),
            square_feet: formData.get("square_feet"),
            amenities,
            rates: {
                weekly: formData.get("rates.weekly"),
                monthly: formData.get("rates.monthly"),
                nightly: formData.get("rates.nightly"),
            },
            seller_info: {
                name: formData.get("seller_info.name"),
                email: formData.get("seller_info.email"),
                phone: formData.get("seller_info.phone"),
            },
            owner: userId,
        }



        const property = await Property.findByIdAndUpdate(propertyId, propertyData);
       

        if(!property) {
            return NextResponse.json({ property: null,  success: false, message: "Unable to update property" }, {status: 200});
        }


        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/properties/${property._id}`);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }

}

// DELETE REQUEST: /api/properties/:propertyId
export const DELETE = async (request, { params: { propertyId } }) => {

    try {

        await connectDb();

        const userSession = await getSessionUser();

        if(!userSession || !userSession.userId) {
            return NextResponse.json({ user: null,  success: false, message: "User ID is required" }, {status: 401});
        }

        if(!propertyId) {
            return NextResponse.json({ property: null,  success: false, message: "Property ID is required" }, {status: 401});
        }

        const property = await Property.findById(propertyId);

        if(!property) {
            return NextResponse.json({ property: null,  success: false, message: "failed" }, {status: 400});
        }

        if(property.owner.toString() !== userId) {
            return NextResponse.json({ property: null,  success: false, message: "unauthorized" }, {status: 400});
        }

        await property.deleteOne();

        return NextResponse.json({ property: null, success: true, message: "Property deleted" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}