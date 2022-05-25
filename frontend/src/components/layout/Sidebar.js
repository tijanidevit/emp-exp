import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Expenses Management</span>
            </li>
            <li>
              <Link to="/dashboard">
                <i className="fas fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/dashboard/employees">
                <i className="fas fa-users"></i> <span>Employees</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
