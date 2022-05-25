import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllEmployees,
  fetchEmployees,
} from "../../features/employees/employeesSlice";

const EmployeeOptions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (true) {
      dispatch(fetchEmployees());
    }
  }, [dispatch]);
  const employees = useSelector(AllEmployees);

  return (
    <>
      {employees.map((employee) => {
        return (
          <option key={employee.id} value={employee.id}>
            {employee.fullname}
          </option>
        );
      })}
    </>
  );
};

export default EmployeeOptions;
