import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const initialState = [];

export const fetchMerchants = createAsyncThunk(
  "merchants/fetchMerchants",
  async () => {
    try {
      const res = await axios.get(API_URL + "merchants/all");
      return res.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const merchantsSlice = createSlice({
  name: "merchants",
  initialState,
  reducers: {
    // addMerchant: {
    //   reducer(state, action) {
    //     state.push(action.payload);
    //   },
    //   prepare(post) {
    //     return {
    //       payload: { ...post, id: nanoid() },
    //     };
    //   },
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchMerchants.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export const AllMerchants = (state) => state.merchants; //To avoid changing the shape of states in the components
export default merchantsSlice.reducer;
