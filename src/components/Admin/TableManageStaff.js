import React, { useEffect, useState } from "react";
import Staff from "./ManageStaff";
import "../../CSS/tableForStaff.css";
import { PopUpCheckOut } from "./popUp";

export default function TableForStaff() {
  const [tables, setTable] = useState([]);
  const [openTable, setOpenTable] = useState(false);
  const [objTable, setObjTable] = useState({});

  const baseUrl = `http://tablereservationapi.somee.com/API/Admin/GetAllTables`;
  const getAllTable = () => {
    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTable(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getAllTable();
  }, []);
  const handleOpen = (obj) => {
    setOpenTable(true);
    setObjTable(obj);
  };
  const handleClose = () => {
    setOpenTable(false);
    getAllTable();
  };
  return (
    <>
      <Staff />
      (
      <PopUpCheckOut open={openTable} close={handleClose} table={objTable} />)
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-12 title-block">
                <h1 className="main-title">Manage Reserving Table</h1>
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
                        <div className="col-md-12"></div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body table-responsive">
                    <div class="container">
                      <div class="row">
                        {tables.map((table) => (
                          <>
                            <div class="col">
                              {table.status ? (
                                <>
                                  <button
                                    onClick={() => handleOpen(table)}
                                    style={{ marginLeft: 8 }}
                                  >
                                    <i
                                      class="fa-sharp fa-solid fa-circle fa-2xl"
                                      style={{ color: "#16be94" }}
                                    ></i>
                                  </button>
                                  <br />
                                  <p
                                    style={{
                                      marginTop: 15,
                                    }}
                                  >
                                    Table {table.tableId}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleOpen(table)}
                                    style={{ marginLeft: 8 }}
                                  >
                                    <i
                                      class="fa-sharp fa-solid fa-circle fa-2xl"
                                      style={{ color: "#ff2400" }}
                                    ></i>
                                  </button>

                                  <p
                                    style={{
                                      marginTop: 15,
                                    }}
                                  >
                                    Table {table.tableId}
                                  </p>
                                </>
                              )}
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
