import React from "react";
import { AddExpenseForm, ExpensesCard, PageHeader } from "../components";

const ExpensesPage = () => {
  return (
    <div>
      <PageHeader pageTitle="Expenses" />
      <AddExpenseForm />
      <ExpensesCard />
    </div>
  );
};

export default ExpensesPage;
