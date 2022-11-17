import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuotes = createAsyncThunk("quotes/fetchAll", async () => {
  const response = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}quotes`
  );
  return response.data;
});

export const quoteSlice = createSlice({
  name: "quotes",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllQuotes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllQuotes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchAllQuotes.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export default quoteSlice.reducer;
