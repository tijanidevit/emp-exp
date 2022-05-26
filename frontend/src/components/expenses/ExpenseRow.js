import React from "react";

const ExpenseRow = ({ expense }) => {
  return (
    <tr>
      <td>{expense.employee}</td>
      <td>{expense.merchant}</td>
      <td>{expense.date}</td>
      <td>&#8358;{expense.amount}</td>
      <td>
        <a href={expense.receipt} rel="noreferrer" target="_blank">
          <img style={{ maxHeight: 120 }} src={expense.receipt} alt="Receipt" />
        </a>
      </td>
      <td className="text-wrap">{expense.comment.substring(0, 120)}</td>
      <td></td>
    </tr>
  );
};

export default ExpenseRow;
