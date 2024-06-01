import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/app/slices/appSlice";
export const store = configureStore({
  reducer: appReducer,
});
