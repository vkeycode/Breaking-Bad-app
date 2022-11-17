import { configureStore } from "@reduxjs/toolkit";
import characterSlice from "../Slices/characterSlice";
import quoteSlice from "../Slices/quoteSlice";
export const store = configureStore({
  reducer: {
    characters: characterSlice,
    quotes: quoteSlice,
  },
});
