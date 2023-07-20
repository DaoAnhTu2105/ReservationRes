import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Customer/Menu";
import History from "./components/Customer/History";
import Login from "./components/Admin/Login";
import Table from "./components/Admin/Table";
import Restaurant from "./components/Admin/Restaurant";
import UserManagement from "./components/Admin/UserManagement";
//User CSS
import "./CSS/lib/animate/animate.min.css";
import "./CSS/lib/owlcarousel/assets/owl.carousel.min.css";
import "./CSS/css/bootstrap.min.css";
import "./CSS/css/style.css";
import "wowjs/css/libs/animate.css";
import "easing-js";
import "waypoints/lib/noframework.waypoints";
import "counterup/jquery.counterup.min.js";
import "owl.carousel/dist/owl.carousel.min.js";
// import "./CSS/lib/tempusdominus/css/tempusdominus-bootstrap-4.css";
// import "./CSS/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
// import "./CSS/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
//Admin CSS
import "./CSS/adminlte/adminlte.min.css";
import "./CSS/select2/select2.min.css";
import "./CSS/admin-custom.css";
import "./CSS/loginCSS/main.css";
import "./CSS/loginCSS/util.css";
import "./CSS/restaurant.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* STAFF */}
      {/* <Routes>
        <Route path="/staff" element={<Staff />}></Route>
        <Route
          path="/staff/tableReservation"
          element={<TableReservation />}
        ></Route>
        <Route path="/staff/table" element={<TableForStaff />}></Route>
      </Routes> */}
      {/* Admin */}
      <Routes>
        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/admin/users" element={<UserManagement />}></Route>
        <Route path="/admin/restaurant" element={<Restaurant />}></Route>
        <Route path="/admin/restaurant/table/:id" element={<Table />}></Route>
        <Route path="/admin/menu" element={<Menu />}></Route>
      </Routes>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/history/phone/:id" element={<History />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
