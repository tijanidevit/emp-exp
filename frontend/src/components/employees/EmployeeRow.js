import React from "react";

const EmployeeRow = ({ employee }) => {
  return (
    <tr>
      <td>
        <h2 className="table-avatar">
          <a href="profile.html" className="avatar avatar-sm me-2">
            <img
              className="avatar-img rounded-circle"
              src={employee.profile_picture}
              alt={employee.profile_picture}
            />
          </a>
          <a href="profile.html">
            {employee.fullname} <span>{employee.department.department}</span>
          </a>
        </h2>
      </td>
      <td>{employee.location}</td>
      <td className="text-wrap">
        {employee.job_description.substring(0, 120)}
      </td>
    </tr>
  );
};

export default EmployeeRow;
