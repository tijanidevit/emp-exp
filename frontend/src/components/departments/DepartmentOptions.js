import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllDepartments,
  fetchDepartments,
} from "../../features/departments/departmentsSlice";

const DepartmentOptions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (true) {
      dispatch(fetchDepartments());
    }
  }, [dispatch]);
  const departments = useSelector(AllDepartments);

  return (
    <>
      {departments.map((dept) => {
        return (
          <option key={dept.id} value={dept.id}>
            {dept.department}
          </option>
        );
      })}
    </>
  );
};

export default DepartmentOptions;
