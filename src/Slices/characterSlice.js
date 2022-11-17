import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const response = await axios(
      `${
        process.env.REACT_APP_API_BASE_ENDPOINT
      }characters?limit=${char_limit}&offset=${page * char_limit}`
    );
    return response.data;
  }
);

export const characterSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    status: "idle",
    page: 0,
    isPageLeft: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = "succeeded";
      state.page += 1;
      if (action.payload.length < 12) {
        state.isPageLeft = false;
      }
      console.log(action);
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
  },
});
export default characterSlice.reducer;
