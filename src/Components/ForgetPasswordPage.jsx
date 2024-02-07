import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

export default function ForgetPassword() {
  const emailRef = useRef(null);
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    localStorage.setItem("ForgetPasswordEmail", email);
    setLoader(true);

    const forgetPassword = async (email) => {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB4n3mxcRsx9p4NlhU9Pawi75LNOUgQkr8";
      const obj = {
        requestType: "PASSWORD_RESET",
        email: email,
      };

      try {
        const response = await axios.post(url, obj, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response in forgetPassword", response.data);
      } catch (error) {
        console.log("Error in forgetPassword", error);
      } finally {
        setLoader(false);
      }
    };

    await forgetPassword(email);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={10} sx={{ padding: 4, borderRadius: 4, boxShadow: 10 }}>
        <form action="submit" onSubmit={submitHandler}>
          <Typography variant="h4" gutterBottom>
            Password Reset
          </Typography>
          <label htmlFor="email">Email</label>
          <br />
          <TextField type="email" id="email" required inputRef={emailRef} />
          <br />

          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
