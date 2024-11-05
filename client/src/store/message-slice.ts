import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Message = {
  id?: string;
  text: string;
  senderId: string;
  recieverId: string;
  sessionId: string;
};

type MessageState = {
  items: Message[];
};

const initialState: MessageState = {
  items: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    saveMessage(state, action: PayloadAction<Message>) {
      state.items.push(action.payload);
    },
    saveMessages() {},
    deleteMessage() {},
    deleteMessages() {},
  },
});

export const messageActions = messageSlice.actions;
