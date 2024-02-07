import axios from "axios";

function cleanGmailAddress(emailid) {
    if (emailid) {
      return emailid.replaceAll(`@`, "").replaceAll(".", "");
    }
}

const useDeleteDataFromFirebase = () => {
    const deleteData = async (action, type) => {
        console.log("Action in delete ", action, type);
        let email = localStorage.getItem("email") || false;
      
        let cleanEmail = cleanGmailAddress(email);
        console.log("clean email ", cleanEmail);
        if (!action) {
            console.error("Action object must have an 'id' property for deletion.");
            return;
        }
        let url = `https://sharpener-assignment-bbf12-default-rtdb.firebaseio.com/${type}/${cleanEmail}/${action}.json`;
      
        try {
            const responseInDeleteHandler = await axios.delete(url);
            console.log("Data", responseInDeleteHandler);
        } catch (error) {
            console.log("Error ", error);
        }
    };

    return deleteData;
};

export default useDeleteDataFromFirebase;
