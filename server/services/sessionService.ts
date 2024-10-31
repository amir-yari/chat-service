import MessageModel, { type Message } from "./../models/messageModel";
import SessionModel from "./../models/sessionModel";

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
        const savedMessage = await MessageModel.create({
          text: message.text,
          senderId: message.senderId,
          receiverId: message.receiverId,
          sessionId: message.sessionId,
        });

        return savedMessage;
      } else {
        throw new Error("Session not found");
      }
    } else {
      const newSession = await SessionModel.create({
        participants: [message.senderId, message.receiverId],
      });

      const savedMessage = await MessageModel.create({
        text: message.text,
        senderId: message.senderId,
        receiverId: message.receiverId,
        sessionId: newSession._id,
      });
      return savedMessage;
    }
  } catch (error) {
    console.error("Error storing message:", error);
    throw error;
  }
};

const loadMessages = async (
  userId: string,
  sessionLimit: number = DEFAULT_SESSION_LIMIT,
  messageLimit: number = DEFAULT_MESSAGE_LIMIT,
  sessionPage: number = 1,
  messagePage: number = 1
) => {
  const finalSessionLimit = Math.min(sessionLimit, MAX_SESSION_LIMIT);
  const sessionSkip = finalSessionLimit * (sessionPage - 1);

  const finalMessageLimit = Math.min(messageLimit, MAX_MESSAGE_LIMIT);
  const messageSkip = finalMessageLimit * (messagePage - 1);

  const sessions = await SessionModel.find({ participants: userId })
    .sort({ updatedAt: -1 })
    .skip(sessionSkip)
    .limit(finalSessionLimit);

  const sessionIds = sessions.map((session) => session._id);

  const messages = await MessageModel.find({
    sessionId: { $in: sessionIds },
  })
    .sort({ createdAt: -1 })
    .skip(messageSkip)
    .populate("sessionId")
    .limit(finalMessageLimit)
    .exec();
  return messages;
};

export { storeMessage, loadMessages };
