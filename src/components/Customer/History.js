import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useState, useEffect } from "react";
import phoneIcon from "../../img/phone.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#154c79",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function History() {
  const [historyReserve, setHistory] = useState([]);
  const id = useParams();
  const phone = parseInt(id.id);
  const urlHistory = `http://tablereservationapi.somee.com/API/Customers/GetAllReservationByPhone?phone=${phone}`;

  useEffect(() => {
    fetch(urlHistory)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setHistory(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const [open, setOpen] = useState(true);
  return (
    <>
      <div id="home_p" className="container-fluid bg-white p-0">
        <div className="container-xxl  position-relative p-0">
          <Header />
          <div className="container-xxl py-5 bg-dark hero-header mb-5">
            <div className="container my-5 py-5">
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#FEA116"
                gutterBottom
              >
                Reservation history
              </Typography>
              {historyReserve.length === 0 ? (
                <div style={{ minHeight: 600 }}>
                  No reservation history found.
                </div>
              ) : (
                <TableContainer component={Paper}>
                  <div
                    className="content"
                    style={{
                      paddingBottom: "10px",
                      paddingRight: "20px",
                      textAlign: "right",
                    }}
                  >
                    <h6 style={{ color: "#FEA116" }}>
                      {" "}
                      &nbsp;&nbsp; Modify your order, please contact us at
                      <span>
                        {" "}
                        +84 338 010 426 &nbsp;{" "}
                        <span
                          className="icon-phone trin-trin"
                          style={{ marginTop: "10px" }}
                        ></span>
                      </span>
                    </h6>
                  </div>

                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">
                          Booked Time
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Table Size&nbsp;(person)
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historyReserve.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            align="left"
                            component="th"
                            scope="row"
                          >
                            {row.customerName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.time}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.size}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* <TablePagination rowsPerPageOptions={[10, 50]} /> */}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .trin-trin {
            animation-name: trin;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          .icon-phone {
            background-image: url(${phoneIcon});
            background-repeat: no-repeat;
            background-size: 30px;
            height: 30px;
            width: 30px;
            display: inline-block;
          }

          @keyframes trin {
            from {
              transform: rotate3d(0, 0, 1, 0deg);
            }
            20%, 32%, 44%, 56%, 68% {
              transform: rotate3d(0, 0, 1, 0deg);
            }
            23%, 35%, 47%, 59%, 71% {
              transform: rotate3d(0, 0, 1, 15deg);
            }
            26%, 38%, 50%, 62%, 74% {
              transform: rotate3d(0, 0, 1, 0deg);
            }
            29%, 41%, 53%, 65%, 77% {
              transform: rotate3d(0, 0, 1, -15deg);
            }
            80% {
              transform: rotate3d(0, 0, 1, 0deg);
            }
          }
        `}
      </style>
    </>
  );
}
