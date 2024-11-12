export type Message = {
  _id: string;
  text: string;
  senderId: string;
  receiverId: string;
  sessionId: string;
  status: "sent" | "delivered" | "read";
  createdAt: Date;
  updatedAt: Date;
};
