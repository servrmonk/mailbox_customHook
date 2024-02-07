import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function cleanGmailAddress(emailid) {
  if (emailid) {
    return emailid.replaceAll(`@`, "").replaceAll(".", "");
  }
}
export default function FullPageViewForSent() {
  let email = localStorage.getItem("email") || false;
  let cleanEmailForSent = cleanGmailAddress(email);
  let { id } = useParams();
  console.log("inside fullpageview ", id);

  let [obj, setObj] = useState({});

  useEffect(() => {
    const getData = async () => {
      const url = `https://sharpener-assignment-bbf12-default-rtdb.firebaseio.com/sent/${cleanEmailForSent}/${id}.json`;
      try {
        const response = await axios.get(url);
        const data = response.data;

        setObj(data);
        console.log("Data inside fullpageview ", data);
      } catch (error) {
        console.log("Caught Error in fullpageview ", error);
      }
    };

    getData(); // Call the function inside useEffect
  }, []);
  console.log("obj ", obj);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "50vw",
          height: 400,
          marginLeft: "47px",
          marginTop: "80px",
        },
      }}
    >
      <Paper elevation={8}>
        <Paper
          elevation={3}
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "2px",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          <Avatar
            style={{ width: "40px", height: "40px" }}
            src="https://vectorified.com/images/unknown-person-icon-11.png"
          />
          From: {obj?.to}
        </Paper>
        <Paper
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "2px",
            marginBottom: "2px",
            display: "flex",
          }}
        >
          Subject: {obj?.subject}
        </Paper>
        <Paper
          style={{
            width: "95%",
            padding: "10px",
            marginTop: "2px",
            marginBottom: "2px",
            display: "flex",
            height: "auto",
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: obj?.msg }}></span>
          
        </Paper>
      </Paper>
    </Box>
  );
}
