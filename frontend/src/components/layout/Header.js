import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import LogoSmall from "../../assets/img/logo-small.png";
import LogoWhite from "../../assets/img/logo-white.png";
import AdminLogo from "../../assets/img/profiles/avatar-01.jpg";

const Header = () => {
  return (
    <>
      <div className="header header-one">
        <div className="header-left header-left-one">
          <Link to="/dashboard" className="logo">
            <img src={Logo} alt="Logo" />
          </Link>
          <Link to="/dashboard" className="white-logo">
            <img src={LogoWhite} alt="Logo" />
          </Link>
          <Link to="/dashboard" className="logo logo-small">
            <img src={LogoSmall} alt="Logo" width="30" height="30" />
          </Link>
        </div>

        <Link to="#" id="toggle_btn">
          <i className="fas fa-bars"></i>
        </Link>

        <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <Link to="#" className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars"></i>
        </Link>

        <ul className="nav nav-tabs user-menu">
          <li className="nav-item dropdown has-arrow main-drop">
            <Link
              to=""
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                <img src={AdminLogo} alt="" />
                <span className="status online"></span>
              </span>
              <span>Admin</span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/">
                <i data-feather="log-out" className="me-1"></i> Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
