import { configureStore } from "@reduxjs/toolkit";
import podcasterReducer from "./podcasterSlice";

export const store = configureStore({
  reducer: {
    podcaster: podcasterReducer,
  },
});