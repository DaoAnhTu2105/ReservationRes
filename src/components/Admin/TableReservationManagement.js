import React from "react";
import { useState, useEffect } from "react";
import Staff from "./ManageStaff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TableReservation() {
  const [reservationAPI, setReservationAPI] = useState([]);
  const [userAPI, setUserAPI] = useState([]);
  const reservationUrl = `http://tablereservationapi.somee.com/API/Staff/GetAllReservations`;
  const userUrl = `http://tablereservationapi.somee.com/API/Staff/GetAllCustomers`;
  const urlApprove = `http://tablereservationapi.somee.com/API/Staff/Approve`;
  const urlCancel = `http://tablereservationapi.somee.com/API/Staff/Cancel`;
  const urlCheckOut = `http://tablereservationapi.somee.com/API/Staff/Checkout`;
  const getAllReservationData = () => {
    fetch(reservationUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        return setReservationAPI(data);
      })
      .catch((error) => console.log(error));
  };
  const getAllUserData = () => {
    fetch(userUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        return setUserAPI(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllReservationData();
    getAllUserData();
  }, []);
  const handleApprove = async (id, status) => {
    try {
      const response = await fetch(`${urlApprove}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        getAllReservationData();
        console.log("Reservation updated successfully");
      } else {
        console.log("Failed to update Reservation");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleCancel = async (id, status) => {
    try {
      const response = await fetch(`${urlCancel}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        getAllReservationData();
        console.log("Reservation failed");
      } else {
        console.log("Failed to Reservation");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  const handleCheckOut = async (id, status) => {
    const messCheckOut = window.confirm(
      "Do you want to check out this customer?"
    );
    if (messCheckOut) {
      try {
        const response = await fetch(`${urlCheckOut}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (response.ok) {
          toast.success("Check Out Successful", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          getAllReservationData();
          console.log("Reservation check out");
        } else {
          console.log("Failed to check out");
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      toast.warn("Check Out Failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
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
                          <th>Phone</th>
                          <th>Time</th>
                          <th>Note</th>
                          <th>Guest Size</th>
                          <th>Status</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationAPI.map((res) => (
                          <tr>
                            <td>{res.tableId}</td>
                            <td>{res.customerName}</td>
                            <td style={{ fontWeight: "bold" }}>
                              {
                                userAPI.find(
                                  (cus) => cus.customerId == res.customerId
                                )?.phone
                              }
                            </td>
                            <td>{res.time}</td>
                            <td style={{ maxWidth: 100, overflow: "hidden" }}>
                              {res.note}
                            </td>
                            <td>{res.size}</td>
                            {(res.status === "CheckOut" && (
                              <>
                                <td style={{ color: "#1ec417" }}>
                                  {res.status}
                                </td>
                              </>
                            )) ||
                              (res.status === "Cancel" && (
                                <>
                                  <td style={{ color: "#f00d00" }}>
                                    {res.status}
                                  </td>
                                </>
                              )) ||
                              (res.status === "Pending" && (
                                <>
                                  <td>{res.status}</td>
                                  <td>
                                    <button
                                      className="active-btn"
                                      onClick={() =>
                                        handleApprove(
                                          res.reservationId,
                                          res.status
                                        )
                                      }
                                    >
                                      <i
                                        className="fa-solid fa-check"
                                        style={{ color: "#1ec417" }}
                                      ></i>
                                    </button>
                                    &nbsp;
                                    <button
                                      className="active-btn"
                                      onClick={() =>
                                        handleCancel(
                                          res.reservationId,
                                          res.status
                                        )
                                      }
                                    >
                                      <i
                                        className="fa-solid fa-xmark"
                                        style={{ color: "#f00d00" }}
                                      ></i>
                                    </button>
                                  </td>
                                </>
                              )) ||
                              (res.status === "OnGoing" && (
                                <>
                                  <td style={{ color: "#ffa000" }}>
                                    {res.status}
                                  </td>
                                  <td>
                                    <button
                                      className="active-btn"
                                      onClick={() =>
                                        handleCheckOut(
                                          res.reservationId,
                                          res.status
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-money-check"></i>
                                    </button>
                                  </td>
                                </>
                              ))}
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
