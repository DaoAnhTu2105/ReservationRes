import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PopUpTable({ close, open }) {
  const [size, setSize] = useState(0);
  const [status, setStatus] = useState(true);
  const baseUrl = `http://tablereservationapi.somee.com/API/Admin/CreateTable?restaurantId=1`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ size, status }),
      });

      if (response.ok) {
        close();
        setSize(0);
        setStatus(true);
        console.log("Add table successful");
      } else {
        console.log("Add table failed");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" id="modal-modal-title">
            Add new Table
          </Typography>
          <Typography id="modal-modal-description">
            <form onSubmit={handleSubmit}>
              <Typography sx={{ mt: 2 }}>
                <label htmlFor="size">Table Capacity</label>
                <TextField
                  id="size"
                  variant="standard"
                  value={size}
                  name="size"
                  placeholder="number of table"
                  sx={{ mt: 1 }}
                  onChange={(e) => setSize(e.target.value)}
                />
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <label htmlFor="status">Status</label>
                <TextField
                  id="status"
                  variant="standard"
                  value={status}
                  name="status"
                  placeholder="status"
                  sx={{ mt: 1 }}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} type="submit">
                Add
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export const PopUpMenu = ({ close, open }) => {
  const [imgURL] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishDetail, setDishDetail] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://tablereservationapi.somee.com/API/Admin/CreateMenu?restaurantId=1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dishName,
            dishDetail,
            price,
            type,
            imgURL,
          }),
        }
      );

      if (response.ok) {
        close();
        setDishName("");
        setDishDetail("");
        setPrice(0);
        setType("");
        console.log("Menu added successfully");
      } else {
        console.log("Failed to add menu");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ marginLeft: 20 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Menu
          </Typography>
          <Typography id="modal-modal-description">
            <form onSubmit={handleSubmit}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="dishName">Dish Name</label>
                <TextField
                  id="dishName"
                  variant="standard"
                  value={dishName}
                  name="dishName"
                  placeholder="Name Dish"
                  sx={{ mt: 1 }}
                  onChange={(e) => setDishName(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="dishDetail">Dish Detail</label>
                <TextField
                  id="dishDetail"
                  variant="standard"
                  value={dishDetail}
                  name="dishDetail"
                  placeholder="Detail Dish"
                  sx={{ mt: 1 }}
                  onChange={(e) => setDishDetail(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="price">Price</label>
                <TextField
                  id="price"
                  variant="standard"
                  value={price}
                  name="price"
                  placeholder="Price"
                  sx={{ mt: 1 }}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="type">Type</label>
                <TextField
                  id="type"
                  variant="standard"
                  value={type}
                  name="type"
                  placeholder="Type"
                  sx={{ mt: 1 }}
                  onChange={(e) => setType(e.target.value)}
                />
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} type="submit">
                Add
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export const PopUpEditTable = ({ close, edit, open }) => {
  console.log(edit.tableId);
  const [size, setSize] = useState(edit.size);
  const [status, setStatus] = useState(edit.status);
  const baseUrl = `http://tablereservationapi.somee.com/API/Admin/UpdateTable/${edit.tableId}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ size, status }),
      });

      if (response.ok) {
        close();
        console.log("Table updated successfully");
      } else {
        console.log("Failed to update table");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  useEffect(() => {
    setSize(edit.size);
    setStatus(edit.status);
  }, [edit]);

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Table
          </Typography>
          <Typography id="modal-modal-description">
            <form onSubmit={handleSubmit}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="tableCapacity">Table Capacity</label>
                <TextField
                  id="tableCapacity"
                  variant="standard"
                  value={size}
                  name="tableCapacity"
                  placeholder="Number of table"
                  sx={{ mt: 1 }}
                  onChange={(e) => setSize(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="tableStatus">Status</label>
                <TextField
                  id="tableStatus"
                  variant="standard"
                  value={status}
                  name="tableStatus"
                  placeholder="Status"
                  sx={{ mt: 1 }}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} type="submit">
                SAVE
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export const PopUpStaff = ({ close, open }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [isAdmin] = useState(false);
  const [, setClose] = useState(null);
  const handleSubmit = () => {
    const baseUrl = "http://tablereservationapi.somee.com/API/Admin/CreateUser";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, isAdmin }),
    };

    fetch(baseUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        setClose(close);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log(error.message);
      });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ marginLeft: 20 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Staff
          </Typography>
          <Typography id="modal-modal-description">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="name">Gmail</label>
              <TextField
                id="standard-basic"
                variant="standard"
                value={email}
                name="email"
                placeholder="Gmail"
                sx={{ mt: 1 }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="menuDetail">Password</label>
              <TextField
                id="standard-basic"
                variant="standard"
                value={password}
                name="password"
                placeholder="Password"
                sx={{ mt: 1 }}
                onChange={(e) => setPass(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="menuDetail">Name</label>
              <TextField
                id="standard-basic"
                variant="standard"
                value={name}
                name="name"
                placeholder="Name"
                sx={{ mt: 1 }}
                onChange={(e) => setName(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="menuDetail">Is Admin</label>
              <TextField
                id="standard-basic"
                variant="standard"
                value={isAdmin}
                name="isAdmin"
                sx={{ mt: 1 }}
                aria-readonly
              />
            </Typography>
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export const PopUpEditStaff = ({ close, open, edit }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const baseUrl = `http://tablereservationapi.somee.com/API/Admin/UpdateUser`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/${edit.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, isAdmin }),
      });

      if (response.ok) {
        close();
      } else {
        console.log("Update thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    setEmail(edit.email);
    setPass(edit.password);
    setName(edit.name);
    setIsAdmin(edit.isAdmin);
  }, [edit]);

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ marginLeft: 20 }}>
        <Typography variant="h6" component="h2" id="modal-modal-title">
          Update New Staff
        </Typography>
        <Typography id="modal-modal-description">
          <form onSubmit={handleSubmit}>
            <Typography sx={{ mt: 2 }}>
              <label htmlFor="email">Gmail</label>
              <TextField
                variant="standard"
                value={email}
                id="email"
                name="email"
                placeholder="Gmail"
                sx={{ mt: 1 }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <label htmlFor="password">Password</label>
              <TextField
                variant="standard"
                value={password}
                id="password"
                name="password"
                placeholder="Password"
                sx={{ mt: 1 }}
                onChange={(e) => setPass(e.target.value)}
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <label htmlFor="name">Name</label>
              <TextField
                variant="standard"
                value={name}
                id="name"
                name="name"
                placeholder="Name"
                sx={{ mt: 1 }}
                onChange={(e) => setName(e.target.value)}
              />
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <label htmlFor="isAdmin">Is Admin</label>
              <TextField
                variant="standard"
                value={isAdmin}
                id="isAdmin"
                name="isAdmin"
                sx={{ mt: 1 }}
                readOnly
              />
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} type="submit">
              Save
            </Button>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

export const PopUpEditMenu = ({ close, open, menuEdit }) => {
  const [imgURL] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishDetail, setDishDetail] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const baseUrl = `http://tablereservationapi.somee.com/API/Admin/UpdateMenu`;
  console.log(menuEdit);
  console.log("dish", dishDetail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/${menuEdit.menuId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dishName, dishDetail, price, type, imgURL }),
      });

      if (response.ok) {
        close();
      } else {
        console.log("Update thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    setDishName(menuEdit.dishName);
    setDishDetail(menuEdit.dishDetail);
    setPrice(menuEdit.price);
    setType(menuEdit.type);
  }, [menuEdit]);

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ marginLeft: 20 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update
          </Typography>
          <Typography id="modal-modal-description">
            <form onSubmit={handleSubmit}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="dishName">Dish Name</label>
                <TextField
                  id="dishName"
                  variant="standard"
                  value={dishName}
                  name="dishName"
                  placeholder="Name Dish"
                  sx={{ mt: 1 }}
                  onChange={(e) => setDishName(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="dishDetail">Dish Detail</label>
                <TextField
                  id="dishDetail"
                  variant="standard"
                  value={dishDetail}
                  name="dishDetail"
                  placeholder="Detail Dish"
                  sx={{ mt: 1 }}
                  onChange={(e) => setDishDetail(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="price">Price</label>
                <TextField
                  id="price"
                  variant="standard"
                  value={price}
                  name="price"
                  placeholder="Price"
                  sx={{ mt: 1 }}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <label htmlFor="type">Type</label>
                <TextField
                  id="type"
                  variant="standard"
                  value={type}
                  name="type"
                  placeholder="Type"
                  sx={{ mt: 1 }}
                  onChange={(e) => setType(e.target.value)}
                />
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} type="submit">
                Add
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export const PopUpCheckOut = ({ close, open, table }) => {
  const baseUrl = `http://tablereservationapi.somee.com/API/Staff/UpdateTableStatus`;
  console.log(table);
  const handleSubmit = async (e) => {
    const newStatus = !table.status;
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/${table.tableId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        close();
      } else {
        console.log("Update thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ marginLeft: 20 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to check out this table {table.tableId} !!!
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleSubmit}>
            Save
          </Button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Button variant="outlined" sx={{ mt: 2 }} onClick={close}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PopUpTable;
