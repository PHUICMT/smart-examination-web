import "./CreateExam.scss";

import React, { useState, useEffect } from "react";

import HeaderForTeacher from "../../components/header-for-teacher/header-for-teacher";
import TitleWithInput from "../../components/title-with-input/title-with-input";
import TabBar from "../../components/tab-bar/tab-bar";

import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/modal-notification/moodal-notification";

const CreateExam = () => {
  const CreateExam = 0;
  const Exam = 1;
  const [tab, setTab] = useState(CreateExam);
  const [pin, setPIN] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const addCardButtonStyled = {
    width: "100%",
    height: 100,
  };

  const cardButtonStyled = {
    width: "100%",
    height: 400,
    padding: "12px",
  };

  const onChangeTitle = () => (event) => {
    //to do ...
  };

  const autoGeneratePIN = () => {
    var chars = "0123456789";
    var pinLength = 6;
    var pin = "";
    for (let i = 0; i < pinLength; i++) {
      pin += chars[Math.floor(Math.random() * chars.length)];
    }
    setPIN(pin);
  };

  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };
  useEffect(() => {
    autoGeneratePIN();
  }, []);

  return (
    <React.Fragment>
      <Box>
        <HeaderForTeacher />
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 20 }}>
          <Grid container spacing={2}>
            <TabBar
              onClick={() => {
                setTab(0);
              }}
              title="สร้างข้อสอบ"
              tab={tab}
              CreateExam={CreateExam}
            />
            <TabBar
              onClick={() => {
                setTab(1);
              }}
              title="ข้อสอบ"
              tab={tab}
              CreateExam={Exam}
            />
          </Grid>
        </Box>
        {tab === CreateExam ? (
          <Box sx={{ marginTop: 10 }}>
            <TitleWithInput
              title="ชื่อเรื่อง"
              onChange={onChangeTitle("title")}
              disabled={false}
            />
            <TitleWithInput title="PIN" value={pin} disabled={true} />

            {!isCollapsed ? (
              <div className="add-card-container">
                <Button
                  sx={addCardButtonStyled}
                  onClick={() => {
                    setIsCollapsed(true);
                  }}
                >
                  <IconButton size="large" disabled={true}>
                    <AddIcon fontSize="large" />
                  </IconButton>
                </Button>
              </div>
            ) : (
              <div className="card-container">
                <Box sx={cardButtonStyled}>
                  <TitleWithInput
                    title="คำถาม"
                    onClick={() => {}}
                    disabled={false}
                    blackTitle={true}
                  />
                  {/* <div>
                    <form>
                      <div className="form-group">
                        <textarea
                          class="textarea has-fixed-size"
                          placeholder="เขียนคำตอบ"
                        ></textarea>
                      </div>
                    </form>
                  </div> */}

                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "200px",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        height: "40px",
                        width: "150px",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        setIsCollapsed(false);
                      }}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ height: "40px", width: "150px" }}
                      onClick={() => {}}
                    >
                      เพิ่มการ์ด
                    </Button>
                  </Box>
                </Box>
              </div>
            )}
          </Box>
        ) : (
          <Typography>ข้อสอบ</Typography>
        )}
      </Container>
      <div className="exam-button">
        <Button
          variant="contained"
          size="large"
          className="submit-exam"
          onClick={handleOpen}
        >
          ยืนยัน
        </Button>
        <Modal title="แจ้งเตือน" show={show}>
          <p>คุณต้องการส่งแบบฟอร์มใช่หรือไม่</p>
        </Modal>
      </div>
    </React.Fragment>
  );
};
export default CreateExam;
