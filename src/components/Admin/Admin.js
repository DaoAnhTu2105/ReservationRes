import React from "react";
import { Link } from "react-router-dom";
function Admin() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <div className="wrapper">
        <div className="main-sidebar sidebar-dark-primary">
          <div className="sidebar">
            <nav className="mt-2">
              <li className="nav-item dropdown pl-2 pt-2">
                <Link to="/admin/users" className="nav-link">
                  Admin
                </Link>
              </li>
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item has-treeview">
                  <Link
                    to={`/admin/users`}
                    className="nav-link sidebar-focused"
                  >
                    <i className="nav-icon fas fa-users"></i>
                    <p>Staff Account</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to={`/admin/restaurant`} className="nav-link">
                    <i className="nav-icon fas fa-building"></i>
                    <p>Restaurant</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to={`/admin/menu`} className="nav-link">
                    <i className="fa-solid fa-utensils nav-icon"></i>
                    <p>Menu</p>
                  </Link>
                </li>
                <div className="mt-5"></div>
                <div className="mt-5"></div>
                <div className="mt-5"></div>
                <div className="mt-5"></div>
                <div className="mt-5"></div>
                <div className="mt-5"></div>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    data-toggle="dropdown"
                    to="/admin/login"
                  >
                    <i class="nav-icon fas fa-power-off"></i>
                    &nbsp; Log out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
