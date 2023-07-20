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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [valueDateTime, setValue] = React.useState(dayjs("2022-04-17T15:30"));
  console.log(valueDateTime);
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

  const handleSubmit = async () => {
    await handleOtpVerify();
    handleClose();
  };

  const handleReserve = async (event) => {
    event.preventDefault();
    const customerName = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
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
      if (response.ok) {
        try {
          const data = await response.json();

          toast.success("Success Booking!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          console.log("data", data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtpVerify = async () => {
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

          if (otpValues.join("") === String(data.data)) {
            console.log("OTP verification successful");
          } else {
            const phone = document.getElementById("phoneForHistory").value;
            if (phone) {
              console.log("OTP verification failed", phone);
              navigate(`/history/phone/${phone}`);
            }
          }
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

  const handleHistory = () => {
    // const urlHistory = `http://tablereservationapi.somee.com/API/Customers/GetAllReservationByPhone?phone=${phone}`;
    // fetch(urlHistory,)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP Status: ${response.status}`)
    //     }
    //     return response.json()
    //   })
    //   .then(data => { setHistory(data) })
    //   .catch(error => console.log(error.message));
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
              <form onSubmit={handleReserve}>
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
                        id="phone"
                        placeholder="Your Phone"
                      />
                      <label htmlFor="email" style={{ color: "#747474" }}>
                        Your Phone
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      style={{ backgroundColor: "white", paddingTop: "10px" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            label="Date & Time"
                            value={valueDateTime}
                            onChange={(newValue) => setValue(newValue)}
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
                      <label htmlFor="select1">Size</label>
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
                      type="submit"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
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
