import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "../Slices/characterSlices";

export const store = configureStore({
  reducer: {
    characters: characterSlice,
  },
});
