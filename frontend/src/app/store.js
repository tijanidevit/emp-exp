import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import employeesReducer from "../features/employees/employeesSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import departmentsReducer from "../features/departments/departmentsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    expenses: expensesReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
  },
});
