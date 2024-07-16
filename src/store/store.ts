import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tripReducer from "./slices/tripSlice.ts";
import userReducer from "./slices/userSlice.ts";

const store = configureStore({
  reducer: {
    trips: tripReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
