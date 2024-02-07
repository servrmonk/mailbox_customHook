import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { inboxMail, sentMail } from '../Redux/MailSlice';

function cleanGmailAddress(emailid) {
  if (emailid) {
    return emailid.replaceAll('@', '').replaceAll('.', '');
  }
}

export const useMailDataFromFirebase = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let email = localStorage.getItem('email') || false;
      let cleanEmailForSent = cleanGmailAddress(email);
      let url = `https://sharpener-assignment-bbf12-default-rtdb.firebaseio.com`;

      try {
        const [sentResponse, inboxResponse] = await Promise.all([
          axios.get(`${url}/sent/${cleanEmailForSent}.json`),
          axios.get(`${url}/inbox/${cleanEmailForSent}.json`)
        ]);

        const sentData = sentResponse.data || {};
        const inboxData = inboxResponse.data || {};

        const emailArrayForSent = Object.keys(sentData).map(key => ({
          id: key,
          ...sentData[key]
        }));
        emailArrayForSent.sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        );
        dispatch(sentMail(emailArrayForSent));

        const emailArrayForInbox = Object.keys(inboxData).map(key => ({
          id: key,
          ...inboxData[key]
        }));
        emailArrayForInbox.sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        );
        dispatch(inboxMail(emailArrayForInbox));
      } catch (error) {
        console.log('Error in fetchData', error);
        // Handle error as needed
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

};
