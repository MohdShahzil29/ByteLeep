import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { authUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
