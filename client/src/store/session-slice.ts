import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Session } from "../types/Session";
import { Message } from "../types/Message";

type SessionState = {
  items: Session[];
  selectedSession?: Session;
};

const initialState: SessionState = {
  items: [],
  selectedSession: undefined,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessions(state, action: PayloadAction<Session[]>) {
      state.items = action.payload;
    },
    setSelectedSession(state, action: PayloadAction<string>) {
      const selectedSession = state.items.find(
        (session) => session.id === action.payload
      );
      state.selectedSession = selectedSession;
    },
    addSession(state, action: PayloadAction<Session>) {
      const { id, participants } = action.payload;
      const existingSession = state.items.find((session) => session.id === id);

      if (!existingSession) {
        state.items.push({ id, participants, messages: [] });
      }
    },
    saveMessage(
      state,
      action: PayloadAction<{ sessionId: string; message: Message }>
    ) {
      const { sessionId, message } = action.payload;

      const session = state.items.find((sess) => sess.id === sessionId);
      if (session) {
        if (!session.messages) {
          session.messages = [];
        }
        session.messages.push(message);
      }

      if (state.selectedSession?.id === sessionId) {
        if (!state.selectedSession.messages) {
          state.selectedSession.messages = [];
        }
        state.selectedSession.messages.push(message);
      }
    },
    updateMessageStatusToDelivered(
      state,
      action: PayloadAction<{
        _id: string;
        sessionId: string;
        status: any;
        updatedAt: Date;
      }>
    ) {
      const { _id, sessionId, status, updatedAt } = action.payload;

      const session = state.items.find((sess) => sess.id === sessionId);
      if (session && session.messages) {
        const message = session.messages.find((msg) => msg._id === _id);
        if (message) {
          message.status = status;
          message.updatedAt = updatedAt;
        }
      }

      if (
        state.selectedSession?.id === sessionId &&
        state.selectedSession.messages
      ) {
        const message = state.selectedSession.messages.find(
          (msg) => msg._id === _id
        );
        if (message) {
          message.status = status;
          message.updatedAt = updatedAt;
        }
      }
    },
    updateSessionStatusToRead(
      state,
      action: PayloadAction<{ sessionId: string; currentUserId: string }>
    ) {
      const { sessionId, currentUserId } = action.payload;

      const session = state.items.find((sess) => sess.id === sessionId);
      if (session && session.messages) {
        session.messages.forEach((message) => {
          if (message.senderId === currentUserId) {
            message.status = "read";
            // message.updatedAt = new Date();
          }
        });
      }

      if (
        state.selectedSession?.id === sessionId &&
        state.selectedSession.messages
      ) {
        state.selectedSession.messages.forEach((message) => {
          if (message.senderId === currentUserId) {
            message.status = "read";
            // message.updatedAt = new Date();
          }
        });
      }
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer;
