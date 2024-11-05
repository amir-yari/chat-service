import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  isLoggedin: boolean;
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profileImage: string;
};

type UserState = {
  user: User;
};

const initialState: UserState = {
  user: {
    isLoggedin: false,
    id: undefined,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    profileImage: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<User>>) {
      state.user = { ...state.user, ...action.payload, isLoggedin: true };
    },
  },
});

export const userActions = userSlice.actions;
