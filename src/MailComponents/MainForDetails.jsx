import { Grid } from "@mui/material";
import React from "react";

import LeftPanel from "./LeftPanel";
// import Middle from "./Middle";
import RightPanel from "./RightPanel";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import SentMailUi from "./SentMailUi";
import { useSelector } from "react-redux";
import FullPageView from "./FullPageView";
import FullPageViewForSent from "./FullPageViewForSent";
// import FullPageView from "./FullPageView";


export default function MainForDetails() {
  const {inboxDetails,sentDetails} = useSelector(state => state.mailS)
  // const [isSent, setIsSent] = useState(false);
  

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
        {inboxDetails && <FullPageView />}||
        {sentDetails && <FullPageViewForSent />}
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
