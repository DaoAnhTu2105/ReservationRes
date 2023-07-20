import React from "react";

import Admin from "./Admin";
import { useState, useEffect } from "react";
import { PopUpEditMenu, PopUpMenu } from "./popUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AdminManageMenu() {
  const [menu, setMenu] = useState(false);
  const [menus, setMenus] = useState([]);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [objMenu, setObjMenu] = useState({});
  const handleOpen = () => {
    setMenu(true);
  };
  const handleClose = () => {
    setMenu(false);
    getAllDataMenu();
  };
  const url = `http://tablereservationapi.somee.com/API/Admin/GetAllMenus`;
  const delMenu = `http://tablereservationapi.somee.com/API/Admin/DeleteMenu`;
  const getAllDataMenu = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMenus(data);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getAllDataMenu();
  }, []);

  const handleOpenEditMenu = (obj) => {
    setOpenEditMenu(true);
    setObjMenu(obj);
  };

  const handleCloseEditMenu = () => {
    setOpenEditMenu(false);
    getAllDataMenu();
  };

  const handleDeleteMenu = async (id) => {
    const messDel = window.confirm("Do you want to delete this menu?");
    if (messDel) {
      try {
        const response = await fetch(`${delMenu}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Delete successful
          console.log("Delete successful");
          getAllDataMenu();
          toast.success("Delete successful", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // Perform any necessary actions after deletion
        } else {
          console.log("Delete failed");
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      toast.error("Delete failed", {
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
    <>
      <Admin />
      <PopUpMenu open={menu} close={handleClose} />
      {objMenu && (
        <PopUpEditMenu
          open={openEditMenu}
          close={handleCloseEditMenu}
          menuEdit={objMenu}
        />
      )}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-12 title-block">
                <h1 className="main-title">Manage Menu</h1>
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
                  <button className="tableAdd" onClick={handleOpen}>
                    Add Menu
                  </button>
                  <div className="card-body table-responsive">
                    <table className="table table-hover text-nowrap job-seeker-tbl">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Detail</th>
                          <th>Price</th>
                          <th>Type</th>
                          <th>Is Deleted</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menus.map((menu) => (
                          <tr>
                            <td>{menu.menuId}</td>
                            <td>{menu.dishName}</td>
                            <td>{menu.dishDetail}</td>
                            <td>{menu.price}</td>
                            <td>{menu.type}</td>
                            {!menu.isDeleted ? (
                              <td style={{ color: "green" }}>False</td>
                            ) : (
                              <td style={{ color: "red" }}>True</td>
                            )}

                            <td>
                              <button
                                className="active-btn"
                                onClick={() => handleOpenEditMenu(menu)}
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </button>
                              &nbsp;
                              <button
                                className="active-btn"
                                onClick={() => handleDeleteMenu(menu.menuId)}
                              >
                                <i class="fa-regular fa-trash-can"></i>
                              </button>
                            </td>
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
    </>
  );
}
