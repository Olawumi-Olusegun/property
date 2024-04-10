
import { NextResponse } from "next/server";
import Property from "./../../../models/property.model"
import connectDb from "../../../config/db";
import { getSessionUser } from "./../../../utils/getSessionUser";
import cloudinary from "./../../../config/cloudinary";


// GET REQUEST: /api/properties
export const GET = async (request) => {

    try {
        await connectDb();

        const page = request.nextUrl.searchParams.get("page") || 1;
        const pageSize = request.nextUrl.searchParams.get("pageSize") || 3;

        const skip = (page - 1) * pageSize;

        const total = await Property.countDocuments({});

        const properties = await Property.find({}).sort({ createdAt: "desc" }).skip(skip).limit(pageSize);

        
        if(properties.length === 0) {
            return NextResponse.json({ properties: [],  success: true, message: "Success" }, {status: 200});
        }

        const result = {
            total,
            properties,
        }

        return NextResponse.json({ result, success: true, message: "Success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}

// POST REQUEST: /api/properties
export const POST = async (request) => {

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
        const images = formData.getAll("images").filter((image) => image.name !== '');

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

        const imageUploadPromise = [];

        for(const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            const imageBase64 = imageData.toString("base64");

            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: "propertypulse"
                }
            );

            imageUploadPromise.push(result.secure_url);

            // wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromise);

            // add uploaded images to property data
            propertyData.images = uploadedImages;
        }

        const newProperty = new Property(propertyData);
        await newProperty.save();

        if(!newProperty) {
            return NextResponse.json({ property: null,  success: false, message: "failed" }, {status: 200});
        }


        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}

