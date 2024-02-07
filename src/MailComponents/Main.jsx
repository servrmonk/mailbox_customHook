import { Grid } from "@mui/material";
import React, { useEffect } from "react";

import LeftPanel from "./LeftPanel";
import Middle from "./Middle";
import RightPanel from "./RightPanel";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SentMailUi from "./SentMailUi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateIsSent } from "../Redux/MailSlice";

export default function Main() {
  // const { isSent } = useSelector((state) => state.mailS);

  const dispatch = useDispatch();
  const { isSent } = useSelector((state) => state.mailS);
  const location = useLocation();

  useEffect(() => {
    
    if (location.pathname === "/sentMail") {
      dispatch(updateIsSent(true));
    } else {
      dispatch(updateIsSent(false));
    }
  }, [location.pathname, dispatch]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2}>
          <LeftPanel />
        </Grid>
        <Grid item xs={9}>
          {isSent ? <SentMailUi /> : <Middle />} ||
        </Grid>
        <Grid item xs={1}>
          <RightPanel />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}
