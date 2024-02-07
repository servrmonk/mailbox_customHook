import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import RightCornerProfile from "./RightCornerProfile";




export default function Navbar() {
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          position="fixed"
          sx={{
            backgroundColor: "#F9F9F9",
            minHeight: "5vw",
            minWidth: "100vw",
            paddingTop: "7px",
            paddingRight: "30px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: "0.8vw", color: "#3C3C3C" }}
                >
                  <MenuIcon sx={{ width: "2vw" }} />
                </IconButton>
                <img
                  style={{ width: "2.3vw" }}
                  src="https://3.bp.blogspot.com/-DsCr0OgLz-k/XEvD4m6CQ5I/AAAAAAAARzE/tTRejCYKN6YCVBwxIZnIKR6gEUWpK-cJQCLcBGAs/s1600/Gmail%2BV1.png"
                  alt="gmail-png"
                />
                <Typography
                  sx={{
                    color: "#3C3C3C",
                    marginLeft: "1vw",
                    fontSize: "1.8vw",
                  }}
                  variant="h6"
                  color="inherit"
                  component="div"
                >
                  Gmail
                </Typography>
              </div>
            </Grid>
            <Grid item xs={9}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "40px",
                  backgroundColor: "#E4EFFA",
                  width: "60vw",
                  height: "3.2vw",
                  marginTop: "0.1vw",
                  marginBottom: "0.1vw",
                  minHeight: "1vw",
                  marginLeft: "3vw",
                }}
              >
                <img
                  style={{
                    width: "2vw",
                    height: "1.6vw",
                    alignItems: "center",
                    marginLeft: "3vw",
                  }}
                  src="https://www.svgrepo.com/show/380085/search.svg"
                  alt="lens_image"
                />
                <input
                  type="text"
                  placeholder="Search mail"
                  style={{
                    height: "3vw",
                    borderRadius: "80vw",
                    width: "55vw",
                    backgroundColor: "#E4EFFA",
                    border: "none",
                    marginLeft: "3vw",
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={1}>
              <RightCornerProfile />
            </Grid>
          </div>
        </AppBar>
      </Box>
    </Grid>
  );
}
