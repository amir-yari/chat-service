import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

type UserState = {
  currentUser: User;
  contacts: User[];
};

const initialState: UserState = {
  currentUser: {
    isLoggedin: false,
    id: undefined,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    profileImage: "",
  },
  contacts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = {
        ...action.payload,
        isLoggedin: true,
      };
    },
    setContacts(state, action: PayloadAction<User[]>) {
      state.contacts = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
