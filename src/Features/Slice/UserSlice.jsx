import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "login",
  initialState: {
    login: localStorage.getItem("chating")
      ? JSON.parse(localStorage.getItem("chating"))
      : null,
  },
  reducers: {
    loggedIn: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { loggedIn } = UserSlice.actions;
export default UserSlice.reducer;
