import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const initialState = {
  admin: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("admin/login", async (data) => {
  try {
    const response = await axios.post(API_URL + "admin/login", data);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAction: {
      reducer(state, action) {
        //state.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedAdmin = action.payload;
        state.admin = loadedAdmin;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//To avoid changing the shape of states in the components
export const adminData = (state) => state.admin.admin;
export const adminStatus = (state) => state.admin.status;
export const adminError = (state) => state.admin.error;

export const { loginAction } = adminSlice.actions;
export default adminSlice.reducer;
