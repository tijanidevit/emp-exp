import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const initialState = [];

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    try {
      const res = await axios.get(API_URL + "departments/all");
      return res.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    // addDepartment: {
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
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const AllDepartments = (state) => state.departments; //To avoid changing the shape of states in the components
export default departmentsSlice.reducer;
