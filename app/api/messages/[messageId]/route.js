import { NextResponse } from "next/server";
import Message from "./../../../../models/message.model"
import connectDb from "../../../../config/db";
import { getSessionUser } from "../../../../utils/getSessionUser";

export const dynamic = "force-dynamic";


// GET REQUEST: /api/messages/:messageId
export const GET = async (request, { params: { messageId } }) => {

    try {

        await connectDb();

        if(!messageId) {
            return NextResponse.json({ message: "messageId is required", success: false,}, {status: 400});
        }

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, {status: 400});
        }

        const {userId} = sessionUser;

        const message = await Message.findById(messageId);

        if(!message) {
            return NextResponse.json({ message: "No message found",  success: false, }, {status: 404});
        }

        if(message.recipient.toString() !== userId) {
            return NextResponse.json({ success: false, message: "Unauthorize" }, {status: 401});
        }

        message.read = !message.read;

        await message.save();

        return NextResponse.json({ message, success: true, message: "success" }, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}


// PUT /api/messages/:id
export const PUT = async (request, { params: { messageId } }) => {
    try {
      await Message();
  
      const sessionUser = await getSessionUser();
  
      if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', {
          status: 401,
        });
      }
  
      const { userId } = sessionUser;
  
      const message = await Message.findById(messageId);
  
      if (!message) {
        return NextResponse.json({ message: "Message not found", success: false, }, {status: 404});
      }
  
      // Verify ownership
      if (message.recipient.toString() !== userId) {
        return NextResponse.json({ message: "Unauthorized", success: false, }, {status: 401});
      }
  
      // Update message to read/unread depending on the current status
      message.read = !message.read;
  
      await message.save();
      return NextResponse.json({ message, success: true, }, {status: 200});
    } catch (error) {
      console.log(error);
     return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
  };
  
  // DELETE /api/messages/:id
  export const DELETE = async (request, { params: { messageId } }) => {
    try {
      await Message();
  
      const sessionUser = await getSessionUser();
  
      if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', {
          status: 401,
        });
      }
  
      const { userId } = sessionUser;
  
      const message = await Message.findById(messageId);
  
      if (!message) {
        return NextResponse.json({ message: "Message not found", success: false, }, {status: 404});
      }
  
      // Verify ownership
      if (message.recipient.toString() !== userId) {
        return NextResponse.json({ message: "Unauthorized", success: false, }, {status: 401});
      }
  
      await message.deleteOne();
  
      return NextResponse.json({ message: "Message Deleted", success: true, }, {status: 200});
    } catch (error) {
      console.log(error);
     return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
  };