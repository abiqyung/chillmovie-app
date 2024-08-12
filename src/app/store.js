import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

// Redux store configuration
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export default store;
