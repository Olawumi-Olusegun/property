
import { NextResponse } from "next/server";
import Message from "./../../../../models/message.model"
import connectDb from "../../../../config/db";
import { getSessionUser } from "./../../../../utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return NextResponse.json({count, success: true, message: "Message count" }, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});

  }
};