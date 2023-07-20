import React from "react";

import { Link } from "react-router-dom";

function Staff() {
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
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className={`nav-item dropdown pl-2 pt-2`}>
                  <Link to="/staff" className="nav-link">
                    Staff
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to={`/staff/tableReservation`} className="nav-link">
                    <i className="nav-icon fas fa-list-ul"></i>
                    <p>Reservation</p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to={`/staff/table`} className="nav-link">
                    <i className="nav-icon fas fa-edit"></i>
                    <p>Reserving Table</p>
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

export default Staff;
