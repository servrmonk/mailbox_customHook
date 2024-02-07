import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../MailComponents/Main";
import LoginPage from "./loginPage";
import { useSelector } from "react-redux";
import ForgetPassword from "./ForgetPasswordPage";
import MainForDetails from "../MailComponents/MainForDetails";

// import MainForSent from "../MailComponents/MainForSent";
// import FullPageView from "../MailComponents/FullPageView";
// import FullPageViewForSent from "../MailComponents/FullPageViewForSent";

export default function AllRoutes() {
  const { isAuth: data } = useSelector((state) => state.auth);

  return (
    <Routes>
      {data ? (
        <>
          
          <Route path="/sharpener-mailbox" element={<Main />} />
          
          <Route path="/inbox" element={<Main />} />
          <Route path="/sentMail" element={<Main />} />
          <Route path="/inbox/:id" element={<MainForDetails />} />
          <Route path="/sentMail/:id" element={<MainForDetails />} />
          <Route path="*" element={<Main />} />
          
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />

          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  );
}
