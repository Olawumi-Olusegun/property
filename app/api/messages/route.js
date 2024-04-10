

import { NextResponse } from "next/server";
import Message from "./../../../models/message.model"
import connectDb from "../../../config/db";
import { getSessionUser } from "./../../../utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async () => {
    try {

      await connectDb();
  
      const sessionUser = await getSessionUser();
  
      if (!sessionUser || !sessionUser.user) {
        return NextResponse.json(JSON.stringify('User ID is required'), {
          status: 401,
        });
      }
  
      const { userId } = sessionUser;
  
      const readMessages = await Message.find({ recipient: userId, read: true })
        .sort({ createdAt: -1 }) // Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name');
  
      const unreadMessages = await Message.find({
        recipient: userId,
        read: false,
      })
        .sort({ createdAt: -1 }) // Sort read messages in asc order
        .populate('sender', 'username')
        .populate('property', 'name');
  
      const messages = [...unreadMessages, ...readMessages];
  
      return NextResponse.json({messages, success: true, message: "Message sent" }, {status: 200});
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
  };

// POST REQUEST: /api/messages
export const POST = async (request) => {

    try {
        await connectDb();

        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, {status: 400});
        }

        const {userId} = sessionUser;

        const messageData = await request.json();

        const { name, email, phone, message, recipient, property } = messageData;

        // User cannot send message to self
        if(userId === recipient) {
            return NextResponse.json({ success: false, message: "Cannot send message to self" }, {status: 400});
        }

        const newMessage = new Message({ name, email, phone, body: message, recipient, property });
        await newMessage.save();

        if(!newMessage) {
            return NextResponse.json({  success: false, message: "Message bot sent" }, {status: 401});
        }

        return NextResponse.json({  success: true, message: "Message sent" }, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Something went wrong" }, {status: 500});
    }
}


// DELETE /api/messages/:id
export const DELETE = async (request, { params: { messageId } }) => {
    try {
      await connectDb();
  
      const sessionUser = await getSessionUser();
  
      if (!sessionUser || !sessionUser.user) {
        return new Response('User ID is required', {
          status: 401,
        });
      }
  
      const { userId } = sessionUser;
  
      const message = await Message.findById(messageId);
  
      if (!message) {
        return NextResponse.json({  success: false, message: "Message Not Found" }, {status: 404});
      }
  
      // Verify ownership
      if (message.recipient.toString() !== userId) {
        return NextResponse.json({  success: false, message: "Unauthorized" }, {status: 401});
      }
  
      await message.deleteOne();
  
      return NextResponse.json({  success: false, message: "Message Deleted" }, {status: 200});
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({  success: false, message: "Something went wrong" }, {status: 500});
    }
  };