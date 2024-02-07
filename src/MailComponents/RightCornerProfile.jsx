import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { logoutFun } from "../Redux/AuthSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { auth, googleProvider } from "../firebase/setup";
// import PersonIcon from "@mui/icons-material/Person";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "35%",
  left: "79%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "20vw",
  bgcolor: "#D8E4F0",
  //   border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "4vw",
  padding: "2vw",
};

export default function RightCornerProfile() {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const logout = async () => {
  console.log("Inside logout handler ");
dispatch(logoutFun())
// navigate('/')
  
  };
  

  return (
    <div>
      <Avatar
        onClick={handleOpen}
        sx={{
          marginLeft: "6.5vw",
          width: "2.7vw",
          height: "2.7vw",
          cursor: "pointer",
        }}
        src='https://vectorified.com/images/unknown-person-icon-11.png'
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ textAlign: "center", fontSize: "1.2vw" }}>
            {email}
          </Typography>
          <Avatar
            // src={PersonIcon}
            src='https://vectorified.com/images/unknown-person-icon-11.png'
            style={{ marginLeft: "11.6vw", width: "6vw", height: "6vw" }}

          />

          <button
            onClick={logout}
            style={{
              borderRadius: "2vw",
              marginTop: "2vw",
              width: "14vw",
              height: "4vw",
              marginLeft: "7.5vw",
              border: "1px solid white",
              fontSize: "1vw",
              cursor: "pointer",
            }}
          >
            <img
              style={{ width: "0.8vw" }}
              src="https://cdn-icons-png.flaticon.com/256/126/126467.png"
              alt="logout_image"
            />{" "}
            Signout
          </button>
          <Typography
            style={{
              fontSize: "0.9vw",
              fontWeight: "100",
              textAlign: "center",
              marginTop: "1vw",
            }}
          >
            Privacy Policy Terms of Service
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
