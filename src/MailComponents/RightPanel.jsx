import React from "react";

function RightPanel() {
  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        textAlign: "center",
        position: "fixed",
        right: "0",
        width: "5vw",
        paddingTop:'4vw'
      }}
    >
      <img
        style={{ width: "1.4vw",paddingTop:'2vw' }}
        src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-calendar-1024.png"
        alt="calender_image"
      />
      <br />
      <img
        style={{ width: "1.4vw" ,paddingTop:'2vw'}}
        src="https://tse2.mm.bing.net/th?id=OIP.Pe9Dqz_CiIjQ5lCM4RGtngHaHa&pid=Api&P=0&h=180"
        alt="user_image"
      />
      <br />
      <img
        style={{ width: "1.4vw",paddingTop:'2vw' }}
        src="https://tse1.mm.bing.net/th?id=OIP.stLm5Z7fAjAryatB8jZN7AHaHa&pid=Api&P=0&h=180"
        alt="task_image"
      />
    </div>
  );
}

export default RightPanel;
