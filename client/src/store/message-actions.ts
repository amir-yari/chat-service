// message-actions.ts
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { messageActions } from "./message-slice";
import { Message } from "./message-slice";

const API_URL =
  "mongodb+srv://amir-yari:9EdKGqG37IG5eh8z@chat.6dcsb.mongodb.net/?retryWrites=true&w=majority&appName=chat";

export const fetchMessagesData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(API_URL);
      const messagesData: Message[] = response.data;
      //@ts-ignore
      dispatch(messageActions.saveMessages(messagesData));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
};

export const sendMessageData = (message: Message) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(API_URL, message);

      dispatch(messageActions.saveMessage(message));
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
};
