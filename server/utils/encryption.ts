import crypto from "crypto";
import { type Message, type EncryptedMessage } from "../models/messageModel";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY as string;
const ivLength = 16;

const encryptMessage = (message: Message): EncryptedMessage => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted = cipher.update(message.text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encryptedMessage = {
    text: encrypted.toString("hex"),
    senderId: message.senderId,
    receiverId: message.receiverId,
    sessionId: message.sessionId,
    iv: iv.toString("hex"),
  };

  return encryptedMessage;
};

const decryptMessage = (encryptedMessage: EncryptedMessage): Message => {
  const iv = Buffer.from(encryptedMessage.iv, "hex");
  const encryptedText = Buffer.from(encryptedMessage.text, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  const message = {
    text: decrypted.toString(),
    senderId: encryptedMessage.senderId,
    receiverId: encryptedMessage.receiverId,
    sessionId: encryptedMessage.sessionId,
  };

  return message;
};

export { encryptMessage, decryptMessage };
