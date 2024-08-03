import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  profilePicture: "", // Added profilePicture
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      if (action.payload.profilePicture !== undefined) {
        state.profilePicture = action.payload.profilePicture;
      }
    },
    updateUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      if (action.payload.profilePicture !== undefined) {
        state.profilePicture = action.payload.profilePicture;
      }
    },
    logoutUser: (state) => {
      state.id = null;
      state.username = "";
      state.email = "";
      state.profilePicture = ""; // Reset profilePicture on logout
    },
  },
});

export const { loginUser, updateUser, logoutUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
