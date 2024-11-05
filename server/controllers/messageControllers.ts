import { type RequestHandler } from "express";
import z from "zod";
import { ClientErrors, ServerErrors } from "@mssd/errors";
import { loadMessages } from "../services/sessionService";

const getMessagesSchema = z.object({
  userId: z.string().min(1),
  sessionLimit: z.number().int().positive().optional(),
  messageLimit: z.number().int().positive().optional(),
  sessionPage: z.number().int().positive().optional(),
  messagePage: z.number().int().positive().optional(),
});

const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const result = await getMessagesSchema.safeParseAsync(req.body);
    if (!result.success) {
      throw new ClientErrors.RequestDataValidationError(
        result.error.issues,
        "body"
      );
    }

    const sessionLimit = Number(req.query.sessionLimit) || undefined;
    const messageLimit = Number(req.query.messageLimit) || undefined;
    const sessionPage = Number(req.query.sessionPage) || undefined;
    const messagePage = Number(req.query.messagePage) || undefined;

    const messages = await loadMessages(
      result.data.userId,
      sessionLimit,
      messageLimit,
      sessionPage,
      messagePage
    );

    if (messages) {
      res.status(200).send(messages);
    } else {
      throw new ClientErrors.UnprocessableEntityError("");
    }
  } catch (error) {
    throw ServerErrors.InternalServerError;
  }
};

export { getMessages };
