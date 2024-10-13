import Messages from "../models/messagesModels";
import { RequestHandler } from "express";

const addMessage: RequestHandler = async (req, res, next) => {
  try {
    const { text } = req.body;
    const data = await Messages.create({ text });

    if (data) {
      res.json({ msg: "Message added successfully." });
    } else {
      res.json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    next(ex);
  }
};

export { addMessage };
