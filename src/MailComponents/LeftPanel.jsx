import React from "react";
import Message from "./Message";
import { Link as ReactRouterLink } from "react-router-dom";
import { updateIsSent } from "../Redux/MailSlice";
import { useDispatch } from "react-redux";

export default function LeftPanel() {
  const dispatch = useDispatch();

  // Call this function whenever you want to update isSent
  const changeState = () => {
    dispatch(updateIsSent(true));
  };
  const changeState1 = () => {
    dispatch(updateIsSent(!true));
  };
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        paddingTop: "6vw",
        width: "20vw",
      }}
    >
    
      <Message />

      <div
        style={{
          width: "12vw",
          marginLeft: "0.8vw",
          display: "flex",
          alignItems: "center",
          marginTop: "5vw",
        }}
      >
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.20kSRR8lvjtnGVETaCiGqQAAAA&pid=Api&P=0&h=180"
          alt="Inbox"
          style={{ width: "1.2vw", marginLeft: "2vw" }}
        />
        <ReactRouterLink to="/inbox"         onClick={changeState1}

          style={{cursor: "pointer",textDecoration:'none',color:'inherit', marginLeft: "1.6vw", fontWeight: "400", fontSize: "1.3vw", }}
        >
          Inbox
        </ReactRouterLink>
      </div>
      <div
        style={{
          width: "12vw",
          marginLeft: "0.8vw",
          display: "flex",
          alignItems: "center",
          marginTop: "1vw",
        }}
      >
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.hGkurUAry0bjvu9qqoQbYQHaG-&pid=Api&P=0&h=180"
          alt="starred"
          style={{ width: "1.2vw", marginLeft: "2vw" }}
        />
        <span
          style={{ marginLeft: "1.6vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Starred
        </span>
      </div>

      <div
        style={{
          width: "12vw",
          marginLeft: "0.8vw",
          display: "flex",
          alignItems: "center",
          marginTop: "1vw",
        }}
      >
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.l3Dwv3yzo_SXEc-29VUjOgHaHa&pid=Api&P=0&h=180"
          alt="snoozed"
          style={{ width: "1.2vw", marginLeft: "2vw" }}
        />
        <span
          style={{ marginLeft: "1.6vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Snoozed
        </span>
      </div>
      <div
        style={{
          width: "12vw",
          marginLeft: "0.8vw",
          display: "flex",
          alignItems: "center",
          marginTop: "1vw",
        }}
      >
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.seAzVZBfN3CoJRBq8trWpQHaGz&pid=Api&P=0&h=180"
          alt="send"
          style={{ width: "1.2vw", marginLeft: "2vw" }}
        />
        <ReactRouterLink
        to='/sentMail' 
        onClick={changeState}
          style={{textDecoration:'none',color:'inherit',cursor: "pointer", marginLeft: "1.6vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Sent
        </ReactRouterLink>
      </div>
    </div>
  );
}
