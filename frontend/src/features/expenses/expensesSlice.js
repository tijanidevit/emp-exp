import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const EXPENSES_URL = API_URL + "expenses/";
const initialState = {
  expenses: [],
  status: "idle",
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    try {
      const response = await axios.get(EXPENSES_URL + "all");
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

export const addExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (expense) => {
    try {
      const response = await axios.post(EXPENSES_URL + "create", expense);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (expense) => {
    try {
      const response = await axios.post(EXPENSES_URL + "update", expense);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (expenseId) => {
    try {
      const response = await axios.post(EXPENSES_URL + "delete", expenseId);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchExpenses.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedExpenses = action.payload;
        state.expenses = loadedExpenses;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpenses.pending, (state, action) => {
        state.status = "Adding";
      })
      .addCase(addExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.expenses.push(action.payload);
        fetchExpenses();
      })
      .addCase(addExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//To avoid changing the shape of states in the components
export const AllExpenses = (state) => state.expenses.expenses;
export const expensesStatus = (state) => state.expenses.status;
export const expensesError = (state) => state.expenses.error;

// export const { addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
