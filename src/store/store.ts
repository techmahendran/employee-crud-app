import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "./recordSlice";


export const store = configureStore({
  reducer: {
    records: recordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;