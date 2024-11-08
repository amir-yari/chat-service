import MessageModel, {
  MessageStatus,
  type Message,
} from "./../models/messageModel";
import SessionModel from "./../models/sessionModel";
import { ClientErrors, ServerErrors } from "@mssd/errors";
import { encryptMessage, decryptMessage } from "../utils/encryption";

const DEFAULT_SESSION_LIMIT = 100;
const MAX_SESSION_LIMIT = 1000;
const DEFAULT_MESSAGE_LIMIT = 100;
const MAX_MESSAGE_LIMIT = 100;

const storeMessage = async (message: Message) => {
  try {
    if (message.sessionId) {
      const session = await SessionModel.findByIdAndUpdate(
        message.sessionId,
        { updatedAt: new Date() },
        { new: true }
      );
      if (session) {
        const encryptedMessage = encryptMessage(message);
        const savedMessage = await MessageModel.create({
          text: encryptedMessage.text,
          senderId: encryptedMessage.senderId,
          receiverId: encryptedMessage.receiverId,
          sessionId: encryptedMessage.sessionId,
          iv: encryptedMessage.iv,
        });

        return savedMessage;
      } else {
        throw new ClientErrors.NotFoundError(
          "Session ID is not in the database"
        );
      }
    } else {
      const newSession = await SessionModel.create({
        participants: [message.senderId, message.receiverId],
      });

      const encryptedMessage = encryptMessage(message);
      const savedMessage = await MessageModel.create({
        text: encryptedMessage.text,
        senderId: encryptedMessage.senderId,
        receiverId: encryptedMessage.receiverId,
        sessionId: newSession._id,
        iv: encryptedMessage.iv,
      });
      return savedMessage;
    }
  } catch (error: any) {
    throw new ServerErrors.InternalServerError("", error);
  }
};

const loadMessages = async (
  userId: string,
  sessionLimit: number = DEFAULT_SESSION_LIMIT,
  messageLimit: number = DEFAULT_MESSAGE_LIMIT,
  sessionPage: number = 1,
  messagePage: number = 1
) => {
  try {
    const finalSessionLimit = Math.min(sessionLimit, MAX_SESSION_LIMIT);
    const sessionSkip = finalSessionLimit * (sessionPage - 1);

    const finalMessageLimit = Math.min(messageLimit, MAX_MESSAGE_LIMIT);
    const messageSkip = finalMessageLimit * (messagePage - 1);

    const sessions = await SessionModel.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .skip(sessionSkip)
      .limit(finalSessionLimit);

    const sessionIds = sessions.map((session) => session._id);

    const encryptedMessages = await MessageModel.find({
      sessionId: { $in: sessionIds },
    })
      .sort({ createdAt: -1 })
      .skip(messageSkip)
      .populate("sessionId")
      .limit(finalMessageLimit)
      .exec();

    const messages = encryptedMessages.map((message) => ({
      ...message.toObject(),
      text: decryptMessage({
        iv: message.iv,
        text: message.text,
        senderId: message.senderId,
        receiverId: message.receiverId,
        sessionId: message.sessionId,
        status: message.status,
      }).text,
    }));

    return messages;
  } catch (error: any) {
    throw new ServerErrors.InternalServerError("", error);
  }
};

const updateMessageStatus = async (
  messageId: string,
  status: MessageStatus
) => {
  try {
    const updatedMessage = await MessageModel.findByIdAndUpdate(
      messageId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedMessage) {
      throw new ClientErrors.NotFoundError("Message ID is not in the database");
    }

    return updatedMessage;
  } catch (error: any) {
    throw new ServerErrors.InternalServerError("", error);
  }
};

const markMessagesAsRead = async (
  sessionId: string,
  senderId: string,
  receiverId: string
) => {
  try {
    await MessageModel.updateMany(
      {
        sessionId,
        receiverId,
        status: { $ne: MessageStatus.READ },
      },
      { status: MessageStatus.READ }
    );
  } catch (error: any) {
    throw new ServerErrors.InternalServerError("", error);
  }
};

export { storeMessage, loadMessages, updateMessageStatus, markMessagesAsRead };
