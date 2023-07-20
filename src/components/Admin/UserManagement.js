import React from "react";
import "../../CSS/adminlte/adminlte.min.css";
import "../../CSS/select2/select2.min.css";
import "../../CSS/admin-custom.css";
import AdminReservation from "./Admin";
import { useState, useEffect } from "react";
import { PopUpEditStaff, PopUpStaff } from "./popUp";
export default function UserManagement() {
    const [staffAPI, setStaffAPI] = useState([]);
    const [staff, setStaff] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [objEdit, setObjEdit] = useState("");
    const resUrl = `http://tablereservationapi.somee.com/API/Admin/GetAllUsers`;
    const delUser = `http://tablereservationapi.somee.com/API/Admin/DeleteUser`;
    const handleOpen = () => {
        setStaff(true);
    };
    const handleClose = () => {
        setStaff(false);
        getAllStaff();
    };
    const handleOpenEdit = (obj) => {
        setEditModal(true);
        setObjEdit(obj);
    };
    const handleCloseEdit = () => {
        setEditModal(false);
        getAllStaff();
    };
    const getAllStaff = () => {
        fetch(resUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setStaffAPI(data);
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        getAllStaff();
    }, []);

    const handleDelete = async (userId) => {
        console.log(userId);
        try {
            const response = await fetch(`${delUser}/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                console.log("Delete successful");
                getAllStaff();
            } else {
                console.log("Delete failed");
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };
    return (
        <>
            <AdminReservation />
            <PopUpStaff open={staff} close={handleClose} />
            {objEdit && (
                <PopUpEditStaff
                    open={editModal}
                    close={handleCloseEdit}
                    edit={objEdit}
                />
            )}
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-4">
                            <div className="col-md-12 title-block">
                                <h1 className="main-title">Manage Staff</h1>
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
                                        Add new Staff
                                    </button>
                                    <div className="card-body table-responsive">
                                        <table className="table table-hover text-nowrap job-seeker-tbl">
                                            <thead>
                                                <tr>
                                                    <th>Staff ID</th>
                                                    <th>Password</th>
                                                    <th>Email</th>
                                                    <th>Name</th>
                                                    <th>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {staffAPI.map(
                                                    (staff) =>
                                                        !staff.isAdmin &&
                                                        !staff.isDeleted && (
                                                            <tr key={staff.userId}>
                                                                <td>{staff.userId}</td>
                                                                <td>{staff.password}</td>
                                                                <td>{staff.email}</td>
                                                                <td>{staff.name}</td>
                                                                <td>
                                                                    <button
                                                                        className="active-btn"
                                                                        onClick={() => handleOpenEdit(staff)}
                                                                    >
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                    &nbsp;
                                                                    <button
                                                                        className="active-btn"
                                                                        onClick={() => handleDelete(staff.userId)}
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
        </>
    );
}
