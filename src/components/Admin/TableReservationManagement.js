import React from "react";
import { useState, useEffect } from "react";
import Staff from "./ManageStaff";
export default function TableReservation() {
  const [reservationAPI, setReservationAPI] = useState([]);
  const reservationUrl = `http://tablereservationapi.somee.com/API/Staff/GetAllReservations`;
  useEffect(() => {
    fetch(reservationUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        return setReservationAPI(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Staff />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-12 title-block">
                <h1 className="main-title">Manage Table Reservation</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <form className="col-md-12 form-inline job-seeker-frm">
                      <div className="form-group row col-md-12 search-input">
                        <div className="col-md-12">
                          <div
                            className="input-group"
                            style={{ width: "100%" }}
                          >
                            <input
                              type="text"
                              name="table_search"
                              className="form-control float-right"
                              placeholder="Search"
                            />

                            <div className="input-group-append">
                              <button
                                type="submit"
                                className="btn btn-default"
                                style={{ minWidth: "50px" }}
                              >
                                <i className="fas fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table table-hover text-nowrap job-seeker-tbl">
                      <thead>
                        <tr>
                          <th>Table ID</th>
                          <th>Customer Name</th>
                          <th>Time</th>
                          <th>Note</th>
                          <th>Guest Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationAPI
                          .sort((a, b) => new Date(b.time) - new Date(a.time))
                          .map((res) => (
                            <tr>
                              <td>{res.tableId}</td>
                              <td>{res.customerName}</td>
                              <td>{res.time}</td>
                              <td>{res.note}</td>
                              <td>{res.guestSize}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
