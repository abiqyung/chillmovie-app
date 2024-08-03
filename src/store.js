import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.username;
      state.email = action.payload.email;
    },
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
    },
  },
});

export const { loginUser, updateUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
