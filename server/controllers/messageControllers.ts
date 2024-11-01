import { RequestHandler } from "express";
import z from "zod";
import mongoose from "mongoose";
import { loadMessages, storeMessage } from "../services/sessionService";
import { type Message } from "../models/messageModel";

// const isValidObjectId = (id: string | undefined) =>
//   !!id && mongoose.Types.ObjectId.isValid(id);

// const addMessageSchema = z.object({
//   text: z.string().min(1),
//   // senderId: z.string().refine(isValidObjectId, {
//   //   message: "Invalid ObjectID format for senderId",
//   // }),
//   // receiverId: z.string().refine(isValidObjectId, {
//   //   message: "Invalid ObjectID format for receiverId",
//   // }),
//   senderId: z.string().min(1),
//   receiverId: z.string().min(1),
//   sessionId: z
//     .string()
//     .refine(isValidObjectId, {
//       message: "Invalid ObjectID format for sessionId",
//     })
//     .optional(),
// });

// const addMessage: RequestHandler = async (req, res, next) => {
//   try {
//     console.log("addMessage: Incoming request", req.body);

//     // Run schema validation
//     const result = await addMessageSchema.safeParseAsync(req.body);

//     if (!result.success) {
//       // Log validation errors if any
//       console.log("Validation error:", result.error.errors);
//       res.status(400).json({ errors: result.error.errors });
//       return;
//     }

//     const message = result.data; // Access validated data directly

//     console.log("Validated message data:", message);

//     const savedMessage: Message = await storeMessage({
//       text: message!.text,
//       senderId: message!.senderId,
//       receiverId: message!.receiverId,
//       sessionId: message!.sessionId,
//     });

//     if (savedMessage) {
//       res.status(201).json({ msg: "Message added successfully." });
//     } else {
//       res.status(500).json({ msg: "Failed to add message to the database." });
//     }
//   } catch (ex) {
//     console.error(ex);
//     next(ex);
//   }
// };

const getMessagesSchema = z.object({
  userId: z.string().min(1),
  sessionLimit: z.number().int().positive().optional(),
  messageLimit: z.number().int().positive().optional(),
  sessionPage: z.number().int().positive().optional(),
  messagePage: z.number().int().positive().optional(),
});

const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const { error, data: user } = await getMessagesSchema.safeParseAsync(
      req.body
    );
    if (error) return;

    const sessionLimit = Number(req.query.sessionLimit) || undefined;
    const messageLimit = Number(req.query.messageLimit) || undefined;
    const sessionPage = Number(req.query.sessionPage) || undefined;
    const messagePage = Number(req.query.messagePage) || undefined;

    const messages = await loadMessages(
      user.userId,
      sessionLimit,
      messageLimit,
      sessionPage,
      messagePage
    );

    if (messages) {
      res.send(messages);
    } else {
      res.status(500).json({ msg: "Failed to load messages." });
    }
  } catch (ex) {
    console.error(ex);
    next(ex);
  }
};

export { getMessages };
