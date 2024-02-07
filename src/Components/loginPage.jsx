import {
  Avatar,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  
  Paper,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import { Link as ReactRouterLink } from 'react-router-dom';


import React, { useRef, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFun } from "../Redux/AuthSlice";

export default function LoginPage() {
  // STYLING PART
  const paperStyle = {
    padding: "20px",

    width: 280,
    maxHeight: "100vh",
    margin: "20px auto",
    minHeight: "70vh",
    borderRadius: "40px",
  };
  const btnStyle = {
    margin: "8px 0",
  };
  const avatarStyle = {
    backgroundColor: "green",
  };

  const [isLogin, setIsLogin] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Inside submit Handler");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current?.value || "";
    if (isLogin) {
      if (password !== confirmPassword) {
        console.log("Please enter the correct password in both input boxes");
      }
    }
    console.log("Email ", email, " password ", password);

    
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4n3mxcRsx9p4NlhU9Pawi75LNOUgQkr8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4n3mxcRsx9p4NlhU9Pawi75LNOUgQkr8";
    }

    const register = async () => {
      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
          returnSecureToken: true,
        });
        console.log("response", response);
        if (response.status === 200) {
          const data = response.data;

          console.log("Login succesfully");
          localStorage.setItem("idToken", data.idToken);
          localStorage.setItem("email", data.email);
          dispatch(loginFun(data.idToken))
          navigate("/sharpener-mailbox");
          


        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      } catch (err) {
        alert("error in login page ", err.message);
      }
    };
    register(url);

  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    console.log("login status now", isLogin);
  };

  return (
    <Grid>
      <Paper elevation={24} style={paperStyle}>
        <form action="submit" onSubmit={submitHandler}>
          <Grid align="center">
            {isLogin ? (
              <>
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                  {/* <CreateIcon /> */}
                </Avatar>
                <h2>Login to your account</h2>
              </>
            ) : (
              <>
                {" "}
                <Avatar style={avatarStyle}>
                  <CreateIcon />
                </Avatar>
                <h2>Create your account</h2>
              </>
            )}
          </Grid>
          <TextField
            label="Email"
            fullWidth
            variant="standard"
            required
            placeholder="Enter email"
            inputRef={emailRef}
          ></TextField>

          {isLogin ? (
            <TextField
              label="Password"
              fullWidth
              variant="standard"
              required
              placeholder="Enter password"
              type="password"
              inputRef={passwordRef}
            ></TextField>
          ) : (
            <>
              <TextField
                label="Password"
                fullWidth
                variant="standard"
                required
                placeholder="Enter password"
                type="password"
                inputRef={passwordRef}
              ></TextField>
              <TextField
                label="Confirm Password"
                fullWidth
                variant="standard"
                required
                placeholder="Confirm password"
                type="password"
                inputRef={confirmPasswordRef}
                
              ></TextField>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                />
              </FormGroup>
            </>
          )}

          {isLogin ? (
            <>
              <Button
              
                style={btnStyle}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Login
              </Button>
              <Typography>
              <ReactRouterLink to='/forgetPassword' style={{ textDecoration: "none", color: "inherit" }}>
                Forgot Password
              </ReactRouterLink>
              </Typography>
            </>
          ) : (
            <Button
              style={btnStyle}
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Create my account
            </Button>
          )}

          {isLogin ? (
            <Typography>
              Don't have account ?
              <Button
                onClick={switchAuthModeHandler}
                style={{ textTransform: "none" }}
                variant="text"
                type="submit"
              >
                Signup
              </Button>
            </Typography>
          ) : (
            <Typography>
              Login with existing account ?
              <Button
                onClick={switchAuthModeHandler}
                style={{ textTransform: "none" }}
                variant="text"
                type="submit"
              >
                Login
              </Button>
            </Typography>
          )}
        </form>
      </Paper>
    </Grid>
  );
}
