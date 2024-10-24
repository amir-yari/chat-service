import Message from "../models/messageModel";
import { RequestHandler } from "express";
import { getSession } from "../services/sessionService";

const addMessage: RequestHandler = async (req, res, next) => {
  try {
    const { text, senderId, receiverId } = req.body;

    if (!text || !senderId || !receiverId) {
      res.status(400).json({ msg: "Missing required fields." });
    }

    const sessionId = getSession(senderId, receiverId);

    const message = await Message.create({
      text,
      senderId,
      receiverId,
      sessionId,
    });

    if (message) {
      res
        .status(201)
        .json({ msg: "Message added successfully.", message: message });
    } else {
      res.status(500).json({ msg: "Failed to add message to the database." });
    }
  } catch (ex) {
    next(ex);
  }
};

export { addMessage };
