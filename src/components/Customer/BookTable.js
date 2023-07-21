import React, { useState, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BookTable() {
  const [openBookNowModal, setOpenBookNowModal] = useState(false);
  const [encodeOtpRes, setEncodeOtpRes] = useState("");
  // Function to open "Book Now" modal
  const handleOpenBookNowModal = async () => {
    setOpenBookNowModal(true);
    const phone = document.getElementById("phoneForReservation").value;
    try {
      const response = await fetch(
        `http://tablereservationapi.somee.com/API/Customers/GenerateOTP?phone=${phone}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phone),
        }
      );

      if (response.ok) {
        try {
          const newEncodeOtpRes = await response.json();
          setEncodeOtpRes(newEncodeOtpRes);
          console.log(newEncodeOtpRes);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        // handleHistory()
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  // Function to close "Book Now" modal
  const handleCloseBookNowModal = () => {
    setOpenBookNowModal(false);
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [otpHistory, setOtpHistory] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    const phone = document.getElementById("phoneForHistory").value;
    try {
      const response = await fetch(
        `http://tablereservationapi.somee.com/API/Customers/GenerateOTP?phone=${phone}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phone),
        }
      );
      if (response.ok) {
        try {
          const data = await response.json();
          console.log(data);
          setOtpHistory(data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        // handleHistory()
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };
  const [valueDateTime, setValue] = React.useState(dayjs());
  const handleClose = () => setOpen(false);
  const inputRefs = useRef([]);

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleSubmitReservation = async () => {
    await handleOtpVerifyReservation();
    handleClose();
  };
  const handleSubmit = async () => {
    await handleSubmitHistory();
    handleClose();
  };
  const handleOtpVerifyReservation = async () => {
    if (otpValues.join("") === String(encodeOtpRes.data)) {
      console.log("OTP:", encodeOtpRes.data);
      handleReserve();
      handleCloseBookNowModal();
    } else {
      handleCloseBookNowModal();
    }
  };

  const handleReserve = async () => {
    const customerName = document.getElementById("name").value;
    const phone = document.getElementById("phoneForReservation").value;
    const time = valueDateTime.toISOString();
    const guestSize = parseInt(document.getElementById("select1").value, 10);
    const note = document.getElementById("message").value;

    const payload = {
      customerName,
      phone,
      time,
      guestSize,
      note,
    };
    console.log(payload);
    try {
      const response = await fetch(
        "http://tablereservationapi.somee.com/API/Customers/BookReservation?restaurantId=1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log("aaaaaaaaaaaaaaaaaa", response);
      if (response.ok) {
        try {
          const data = await response.json();
          toast.success("Success Booking!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          console.log("data", data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        toast.warn("You have to wait 30 minutes to create new reservation!!", {
          position: "top-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmitHistory = async () => {
    if (otpValues.join("") === String(otpHistory.data)) {
      const phone = document.getElementById("phoneForHistory").value;
      if (phone) {
        navigate(`/history/phone/${phone}`);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        id="book_a"
        className="container-xxl py-5 px-0 wow fadeInUp "
        data-wow-delay="0.1s"
      >
        <div className="row g-0 d-flex justify-content-center">
          <div className="col-lg-12 bg-dark d-flex ">
            <div className="p-5 wow fadeInUp col-lg-6" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Reservation
              </h5>
              <h1 className="text-white mb-4">Book A Table Online</h1>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                    />
                    <label htmlFor="name" style={{ color: "#747474" }}>
                      Your Name
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="phone"
                      className="form-control"
                      id="phoneForReservation"
                      placeholder="Your Phone"
                    />
                    <label htmlFor="email" style={{ color: "#747474" }}>
                      Your Phone
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div style={{ backgroundColor: "white", paddingTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Date & Time"
                          value={valueDateTime}
                          onChange={(newValue) => setValue(newValue)}
                          minDateTime={valueDateTime}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="col-md-12" style={{ marginRight: "30px" }}>
                  <div className="form-floating">
                    <select className="form-select" id="select1">
                      <option value="2">2 people </option>
                      <option value="4">4 people </option>
                      <option value="6">6 or more people</option>
                    </select>
                    <label htmlFor="select1" style={{ color: "#747474" }}>
                      Size
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Note"
                      id="message"
                      style={{ height: "100px" }}
                    ></textarea>
                    <label htmlFor="message" style={{ color: "#747474" }}>
                      Note
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary w-100 py-3"
                    style={{ color: "white", backgroundColor: "#FEA116" }}
                    onClick={handleOpenBookNowModal}
                  >
                    Book Now
                  </button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openBookNowModal}
                    onClose={handleCloseBookNowModal}
                    closeAfterTransition
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={openBookNowModal}>
                      <Box sx={style}>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          An OTP has been sent to your phone. Please verify to
                          continue.
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            mt: 2,
                          }}
                        >
                          {[0, 1, 2, 3].map((index) => (
                            <TextField
                              key={index}
                              inputRef={(ref) =>
                                (inputRefs.current[index] = ref)
                              }
                              variant="outlined"
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              inputProps={{
                                maxLength: 1,
                                style: { textAlign: "center" },
                              }}
                            />
                          ))}
                        </Box>
                        <Box
                          sx={{
                            pt: 5,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="medium"
                            onClick={handleSubmitReservation}
                          >
                            Submit &nbsp;
                            <SendIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="p-5 wow fadeInUp col-lg-6" data-wow-delay="0.2s">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                History
              </h5>
              <h1 className="text-white mb-4">Reservation History</h1>

              <div className="row g-3">
                <div className="col-md-8">
                  <div className="form-floating col-md-12">
                    <input
                      type="phone"
                      className="form-control"
                      id="phoneForHistory"
                      placeholder="Your Phone"
                    />
                    <label
                      htmlFor="phoneForHistory"
                      style={{ color: "#747474", marginLeft: 7 }}
                    >
                      Your Phone
                    </label>
                  </div>
                </div>
                <div className="col-md-8 col-lg-4">
                  <Button
                    className="w-100 py-3"
                    style={{ color: "white", backgroundColor: "#FEA116" }}
                    onClick={handleOpen}
                  >
                    Enter
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          id="transition-modal-description"
                          sx={{ mt: 2 }}
                        >
                          An OTP has been sent to your phone. Please verify to
                          continue.
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            mt: 2,
                          }}
                        >
                          {[0, 1, 2, 3].map((index) => (
                            <TextField
                              key={index}
                              inputRef={(ref) =>
                                (inputRefs.current[index] = ref)
                              }
                              variant="outlined"
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                              inputProps={{
                                maxLength: 1,
                                style: { textAlign: "center" },
                              }}
                            />
                          ))}
                        </Box>
                        <Box
                          sx={{
                            pt: 5,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="medium"
                            onClick={handleSubmit}
                          >
                            Submit &nbsp;
                            <SendIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Fade>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTable;
