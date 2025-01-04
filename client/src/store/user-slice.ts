import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

type UserState = {
  currentUser: User;
  contacts: User[];
};

const initialState: UserState = {
  currentUser: {
    isLoggedin: false,
    _id: undefined,
    firstname: "",
    lastname: "",
    username: "",
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
      return { ...state, currentUser: action.payload };
    },
    setUserInfo(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    logoutUser() {
      return initialState;
    },
    setContacts(state, action: PayloadAction<User[]>) {
      return { ...state, contacts: action.payload };
    },
  },
});

export const userActions = userSlice.actions;
