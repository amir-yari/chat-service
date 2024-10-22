import Message from "../models/messageModel";
import { RequestHandler } from "express";

const addMessage: RequestHandler = async (req, res, next) => {
  try {
    const { text, senderId, receiverId } = req.body;

    if (!text || !senderId || !receiverId) {
      res.status(400).json({ msg: "Missing required fields." });
    }

    const data = await Message.create({
      text,
      senderId,
      receiverId,
    });

    if (data) {
      res
        .status(201)
        .json({ msg: "Message added successfully.", message: data });
    } else {
      res.status(500).json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    next(ex);
  }
};

export { addMessage };
