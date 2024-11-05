import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user-slice";

export type Session = {
  id?: string;
  participants: User[];
};

type SessionState = {
  session: Session;
};

const initialState: SessionState = {
  session: {
    id: undefined,
    participants: [],
  },
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(
      state,
      action: PayloadAction<{ id: string; participants: User[] }>
    ) {
      state.session = action.payload;
    },
    addParticipant(state, action: PayloadAction<User>) {
      if (
        !state.session.participants.find(
          (user) => user.id === action.payload.id
        )
      ) {
        state.session.participants.push(action.payload);
      }
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer;
