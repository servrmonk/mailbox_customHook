import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import useSentMailToFirebase from "../customHook/sentDataToFirebase";

const style = {
  position: "absolute",
  top: "61%",
  left: "71%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "35vw",
  bgcolor: "background.paper",
  minHeight: "505px",
  padding: "1vw",
};

export default function Message() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("");
  const toRef = React.useRef(null);
  const subjectRef = React.useRef(null);
  const quillRef = React.useRef(null);
  const dispatch = useDispatch();
  const sentData = useSentMailToFirebase(); // Use the custom hook

  const inbox = () => {
    // Access values using refs
    const to = toRef.current.value;
    const subject = subjectRef.current.value;
    const msg = quillRef.current.editor.getText(); // Use getText() to get the message content

    if (msg.trim() === "") {
      alert("Please enter some content in the editor.");
      return;
    }

    let timeStamp = new Date().toJSON();
    let isRead = false;

    return { to, subject, msg, timeStamp, isRead };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your inbox function
    let valueOfInb = inbox();
    // console.log("Val ", valueOfInb);
    sentData(valueOfInb); // Use the sentData function from the custom hook
    // Close the modal
    handleClose();
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          position: "fixed",
          width: "12vw",
          height: "4vw",
          marginLeft: "0.8vw",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          backgroundColor: "#BEE0FF",
          cursor: "pointer",
        }}
      >
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_551847.png"
          alt="compose"
          style={{ width: "1.2vw", marginLeft: "2vw" }}
        />
        <h4
          style={{ marginLeft: "1.6vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Compose
        </h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              backgroundColor: "#EDF9FF",
              position: "absolute",
              top: "0",
              left: "0",
              width: "41vw",
              padding: "0.5vw",
              fontSize: "1vw",
            }}
          >
            New Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              inputRef={toRef}
              variant="standard"
              label="To"
              sx={{ width: "39vw", marginTop: "1vw" }}
            />
            <br />
            <TextField
              required
              inputRef={subjectRef}
              variant="standard"
              label="Subject"
              sx={{ width: "39vw" }}
            />
            <br />
            <br />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={value}
              onChange={setValue}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "6vw",
                fontSize: "1vw",
                width: "1vw",
                height: "3vw",
              }}
            >
              Send
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
