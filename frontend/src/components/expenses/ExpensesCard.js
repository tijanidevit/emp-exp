import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  AllExpenses,
  expensesError,
  expensesStatus,
  fetchExpenses,
} from "../../features/expenses/expensesSlice";
import ExpenseRow from "./ExpenseRow";
import Spinner from "../utilizies/Spinner";

function Expenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(AllExpenses);
  const status = useSelector(expensesStatus);
  const error = useSelector(expensesError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExpenses());
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
                      <th>Employee's name</th>
                      <th>Merchant</th>
                      <th>Date</th>
                      <th>Amount</th>
                      {/* <th>Receipt</th> */}
                      <th>Comment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.length > 0 &&
                      expenses.map((expense, i) => {
                        return (
                          <ExpenseRow key={expense.id} expense={expense} />
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

export default Expenses;
