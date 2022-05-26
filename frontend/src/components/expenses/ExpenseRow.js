import React from "react";

const ShowRowModal = ({ expense }) => {
  return (
    <div className="modal custom-modal fade" id="rowModal" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">Add New Employee {expense.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpenseRow = ({ expense }) => {
  return (
    <tr>
      <td>{expense.employee}</td>
      <td>{expense.merchant}</td>
      <td>{expense.date}</td>
      <td>&#8358;{expense.amount}</td>
      {/* <td>
        <a href={expense.receipt} rel="noreferrer" target="_blank">
          <img style={{ maxHeight: 120 }} src={expense.receipt} alt="Receipt" />
        </a>
      </td> */}
      <td className="text-wrap">{expense.comment.substring(0, 120)}</td>
      <td>
        {" "}
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#rowModal${expense.id}`}
        >
          View
        </button>
        <ShowRowModal expense={expense} />
      </td>
    </tr>
  );
};

export default ExpenseRow;
