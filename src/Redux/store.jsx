import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
import MailSliceReducer from "./MailSlice";
const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    mailS:MailSliceReducer
  },
});
export default store;
