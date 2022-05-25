import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  AllEmployees,
  employeesError,
  employeesStatus,
  fetchEmployees,
} from "../../features/employees/employeesSlice";
import EmployeeRow from "./EmployeeRow";
import Spinner from "../utilizies/Spinner";

function Employees() {
  const dispatch = useDispatch();
  const employees = useSelector(AllEmployees);
  const status = useSelector(employeesStatus);
  const error = useSelector(employeesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  return (
    <div className="row">
      {status === "loading" && <Spinner />}
      <div className="col-sm-12">
        <div className="card card-table">
          <div className="card-body">
            {status === "succeeded" && (
              <div className="table-responsive">
                <table
                  className="table table-striped table-center table-hover"
                  id="myTable"
                >
                  <thead className="thead-light">
                    <tr>
                      <th>Profile Picture</th>
                      <th>Location</th>
                      <th>Job Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length > 0 &&
                      employees.map((employee, i) => {
                        return (
                          <EmployeeRow key={employee.id} employee={employee} />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {status === "failed" && <h2> {error} </h2>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
