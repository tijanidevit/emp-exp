import React from "react";
import { AddEmployeeForm, EmployeesCard, PageHeader } from "../components";

const EmployeesPage = () => {
  return (
    <div>
      <PageHeader pageTitle="Employees" />
      <AddEmployeeForm />
      <EmployeesCard />
    </div>
  );
};

export default EmployeesPage;
