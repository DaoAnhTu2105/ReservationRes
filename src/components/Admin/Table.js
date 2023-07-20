import React from "react";
import Admin from "./Admin";
import { useState, useEffect } from "react";
import PopUpTable, { PopUpEditTable } from "./popUp";

export default function Table() {
  const [modalTable, setModalTable] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [tableAPI, setTableAPI] = useState([]);

  const tableUrl = `http://tablereservationapi.somee.com/API/Admin/GetAllTables`;
  const delTable = `http://tablereservationapi.somee.com/API/Admin/DeleteTable`;

  const handleTable = () => {
    setModalTable(true);
  };
  const handleClose = async () => {
    await setModalTable(false);
    getAllTableData();
  };
  const handleEditTable = (obj) => {
    setEditModal(true);
    setEdit(obj);
  };
  const handleEditClose = () => {
    setEditModal(false);
    getAllTableData();
  };

  useEffect(() => {
    getAllTableData();
  }, []);

  const getAllTableData = () => {
    fetch(tableUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return setTableAPI(data);
      })
      .catch((error) => console.log(error.message));
  };

  const handleDeleteTable = async (id) => {
    try {
      const response = await fetch(`${delTable}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Delete successful");
        getAllTableData();
      } else {
        console.log("Delete failed");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div>
      <Admin />
      <PopUpTable close={handleClose} open={modalTable} />
      {edit && (
        <PopUpEditTable close={handleEditClose} open={editModal} edit={edit} />
      )}
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
                  <button className="tableAdd" onClick={handleTable}>
                    Add Table
                  </button>
                  <div className="card-body table-responsive">
                    <table className="table table-hover text-nowrap job-seeker-tbl">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Table Size</th>
                          <th>Restaurant ID</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableAPI.map(
                          (table) =>
                            table.status && (
                              <tr>
                                <td>{table.tableId}</td>
                                <td>{table.size} persons</td>
                                <td>{table.restaurantId}</td>
                                <td>
                                  <button
                                    className="active-btn"
                                    onClick={() => handleEditTable(table)}
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </button>
                                  &nbsp;
                                  <button
                                    className="active-btn"
                                    onClick={() =>
                                      handleDeleteTable(table.tableId)
                                    }
                                  >
                                    <i class="fa-regular fa-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            )
                        )}
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
