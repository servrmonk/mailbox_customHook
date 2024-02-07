import React, { useEffect, useState } from "react";
import { ListItem, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useMailDataFromFirebase } from "../customHook/getMail";
import useDeleteDataFromFirebase from "../customHook/deleteMailHook";
import { inboxDetailsFire, sentDetailsFire } from "../Redux/MailSlice";

export default function Middle() {
  const [arrForUi, setArrForUi] = useState([]);
  const dispatch = useDispatch();
  const { inboxMailArr: mailArr } = useSelector((state) => state.mailS);

  // Replace useEffect fetching sent mail with custom hook
  useMailDataFromFirebase();

  useEffect(() => {
    setArrForUi(mailArr);
  }, [mailArr]);

  const deleteDataFromFirebase = useDeleteDataFromFirebase();

  const deleteHandler = (user) => {
    deleteDataFromFirebase(user.id, "inbox");
    setArrForUi((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter((ex) => ex.id !== user.id);
      return updatedExpenses;
    });
  };

  const openInboxInDetail = (id) => {
    const email = localStorage.getItem("email") || false;
    const cleanEmail = cleanGmailAddress(email);
    const url = `https://sharpener-assignment-bbf12-default-rtdb.firebaseio.com/inbox/${cleanEmail}/${id}.json`;

    axios
      .patch(url, { isRead: true })
      .then(() => {
        dispatch(sentDetailsFire(!true));
        dispatch(inboxDetailsFire(true));
        const updatedArrForUi = arrForUi.map((mail) =>
          mail.id === id ? { ...mail, isRead: true } : mail
        );
        setArrForUi(updatedArrForUi);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cleanGmailAddress = (emailid) => {
    if (emailid) {
      return emailid.replaceAll(`@`, "").replaceAll(".", "");
    }
  };

  return (
    <div style={{ position: "static", marginLeft: "2.5vw", width: "75vw" }}>
      <img
        style={{
          width: "1.5vw",
          height: "1.5vw",
          marginLeft: "1.5vw",
          marginTop: "2vw",
          paddingTop: "6vw",
        }}
        src="https://tse3.mm.bing.net/th?id=OIP.NJ0h3cKSkS99y32rjkZ5ewHaHa&pid=Api&P=0&h=180"
        alt=""
      />
      <Paper
        elevation={0}
        style={{
          borderBottom: "1px solid #EFEFEF",
          borderTop: "1px solid #EFEFEF",
          marginTop: "1.5vw",
          backgroundColor: "#F8FCFF",
        }}
      >
        {arrForUi?.map((user) => (
          <ListItem
            key={user.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              {!user.isRead ? (
                <div
                  style={{
                    borderRadius: "50%",
                    height: "10px",
                    width: "10px",
                    backgroundColor: "orange",
                  }}
                ></div>
              ) : null}
              <NavLink
                to={`/inbox/${user.id}`}
                onClick={() => openInboxInDetail(user.id)}
                style={{
                  fontSize: "1.3vw",
                  marginLeft: "1.2vw",
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {user.subject}
                {/* <span style={{ marginLeft: "12vw", fontWeight: "100" }}>
                  {user.msg}
                </span> */}
                <span
                  style={{ display:'inline-block', marginLeft: "12vw", fontWeight: "100" }}
                  dangerouslySetInnerHTML={{ __html: user.msg }}
                ></span>
              </NavLink>
            </div>
            {/* <DeleteIcon
              onClick={() => deleteHandler(user)}
              style={{ cursor: "pointer" }}
            /> */}
            <span style={{ fontWeight: "100",display:'flex'}}>
              {/* {new Date(user.timeStamp).toISOString().split("T")[0]} */}
              {new Date(user.timeStamp).toLocaleString() }
              <DeleteIcon
              onClick={() => deleteHandler(user)}
              style={{marginRight:'5px',marginLeft:'15px', cursor: "pointer" }}
            />
            </span>
          </ListItem>
        ))}
      </Paper>
      <h6 style={{ fontWeight: "400", marginLeft: "28vw" }}>
        Terms . Privacy . Program Policies
      </h6>
    </div>
  );
}
