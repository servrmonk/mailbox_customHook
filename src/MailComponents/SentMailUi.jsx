import { ListItem, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { useMailDataFromFirebase } from "../customHook/getMail";
import useDeleteDataFromFirebase from "../customHook/deleteMailHook";
import { inboxDetailsFire, sentDetailsFire } from "../Redux/MailSlice";

export default function SentMailUi() {
  const dispatch = useDispatch();

  // Use the custom hook to fetch mail data
  useMailDataFromFirebase();

  const { sentEmailArr: mailArr } = useSelector((state) => state.mailS);
  const [arrForUi, setArrForUi] = useState([]);

  useEffect(() => {
    setArrForUi(mailArr);
  }, [mailArr]);

  const deleteDataFromFirebase = useDeleteDataFromFirebase();

  const deleteHandler = (user) => {
    deleteDataFromFirebase(user.id, "sent");
    setArrForUi((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter((ex) => ex.id !== user.id);
      return updatedExpenses;
    });
  };

  const openSentInDetails = () => {
    dispatch(inboxDetailsFire(!true));
    dispatch(sentDetailsFire(true));
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
              
              <NavLink
                onClick={openSentInDetails}
                to={`/sentMail/${user.id}`}
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
                <span
                  dangerouslySetInnerHTML={{ __html: user.msg }}
                  style={{
                    display:'inline-block',
                    marginLeft: "1.2vw",
                    fontWeight: "100",
                    cursor: "pointer",
                  }}
                />
              </NavLink>
            </div>
            <span style={{ fontWeight: "100",display:'flex'}}>
            {new Date(user.timeStamp).toLocaleString() }
            <DeleteIcon
              onClick={() => deleteHandler(user)}
              style={{marginRight:'5px',marginLeft:'15px', cursor: "pointer" }}
            />
            </span>
          </ListItem>
        ))}
      </Paper>

      {/* Terms, Privacy, Program Policies */}
      <h6 style={{ fontWeight: "400", marginLeft: "28vw" }}>
        Terms . Privacy . Program Policies
      </h6>
    </div>
  );
}
