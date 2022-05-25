import React from "react";

const PageHeader = ({ pageTitle }) => {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          <h3 className="page-title">{pageTitle}</h3>
          <ul className="breadcrumb">
            <li className="breadcrumb-ite">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="breadcrumb-item active text-gray">
              {" "}
              &nbsp;/{pageTitle}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
