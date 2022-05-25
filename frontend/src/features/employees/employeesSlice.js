import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const EMPLOYEES_URL = API_URL + "employees/";
const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    try {
      const response = await axios.get(EMPLOYEES_URL + "all");
      if (response.data) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const addEmployees = createAsyncThunk(
  "employees/addEmployees",
  async (employee) => {
    try {
      const response = await axios.post(EMPLOYEES_URL + "create", employee);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedEmployees = action.payload;
        state.employees = loadedEmployees;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployees.pending, (state, action) => {
        state.status = "Adding";
      })
      .addCase(addEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.employees.push(action.payload);
        fetchEmployees();
      })
      .addCase(addEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//To avoid changing the shape of states in the components
export const AllEmployees = (state) => state.employees.employees;
export const employeesStatus = (state) => state.employees.status;
export const employeesError = (state) => state.employees.error;

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
