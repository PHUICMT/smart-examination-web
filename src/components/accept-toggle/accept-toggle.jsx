import "./accept-toggle.scss";
import WebcamActive from "../../assets/icons/video-active.svg";
import WebcamDeActive from "../../assets/icons/video-deactive.svg";
import ScreenActive from "../../assets/icons/screen-active.svg";
import ScreenDeActive from "../../assets/icons/screen-deactive.svg";

import { React, useState } from "react";
import { Container } from "react-bulma-components";
import Toggle from "react-toggle";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

import AcceptCard from "../../components/accept-card/accept-card";

const AcceptToggle = () => {
  const [webcamToggleAllows, setWebcamToggleAllows] = useState(true);
  const [screenToggleAllows, setScreenToggleAllows] = useState(true);
  let history = useHistory();

  const handleSubmited = () => {
    history.push({
      pathname: "/index", //TODO go to แบบทดสอบ
      state: { webcamToggleAllows, screenToggleAllows },
    });
  };

  const AcceptForm = () => {
    return (
      <Container className="container-box">
        <div className="accept-toggle-container">
          <div className="accept-toggle-box">
            <Toggle
              defaultChecked={webcamToggleAllows}
              className="custom-react-toggle"
              onChange={() => setWebcamToggleAllows(!webcamToggleAllows)}
            />
            <h1>เข้าถึงกล้อง Webcam และบันทึกวิดีโอ</h1>
            <img
              alt="webcam"
              src={webcamToggleAllows ? WebcamActive : WebcamDeActive}
            />
          </div>

          <div className="accept-toggle-box">
            <Toggle
              defaultChecked={screenToggleAllows}
              className="custom-react-toggle"
              onChange={() => setScreenToggleAllows(!screenToggleAllows)}
            />
            <h1>บันทึกวิดีโอหน้าจอ</h1>
            <img
              alt="screen"
              src={screenToggleAllows ? ScreenActive : ScreenDeActive}
            />
          </div>
        </div>

        <div>
          <Button
            onClick={() => handleSubmited()}
            variant="contained"
            size="large"
            className="submit-button"
          >
            ยืนยัน
          </Button>
        </div>
      </Container>
    );
  };

  return (
    <Container>
      <AcceptCard />
      <AcceptForm />
    </Container>
  );
};

export default AcceptToggle;
