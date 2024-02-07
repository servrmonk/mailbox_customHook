import { useEffect } from "react";
import axios from "axios";

function cleanGmailAddress(emailid) {
  if (emailid) {
    return emailid.replaceAll("@", "").replaceAll(".", "");
  }
}
function useSentMailToFirebase() {

  async function sentData(action) {
    if (!action) return; // Ensure action is provided
    let email = localStorage.getItem("email") || false;
    let cleanEmailForSent = cleanGmailAddress(email);
    let cleanEmailForInbox = cleanGmailAddress(action.to);
    let url = `https://sharpener-assignment-bbf12-default-rtdb.firebaseio.com`;

    try {
      await axios.post(`${url}/sent/${cleanEmailForSent}.json`, action);
      await axios.post(`${url}/inbox/${cleanEmailForInbox}.json`, action);
    } catch (error) {
      console.log("Error in postData", error);

      if (error.response) {
        console.log("Server responded with a non-2xx status");
        console.log("Response data:", error.response.data);
        console.log("HTTP status code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request was made but no response was received");
        console.log("Request:", error.request);
      } else {
        console.log("Error during request setup:", error.message);
      }
      console.log("Error config:", error.config);
    }
  }

  useEffect(() => {
    return sentData;
  }, []);

  return sentData;
}

export default useSentMailToFirebase;
