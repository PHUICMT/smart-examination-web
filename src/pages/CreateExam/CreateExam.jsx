import "./CreateExam.scss";

import React, { useState } from "react";

import HeaderForTeacher from "../../components/header-for-teacher/header-for-teacher";

import {
  Container,
  Typography,
  Grid,
  Box,
  OutlinedInput,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddIcon from "@mui/icons-material/Add";

const CreateExam = () => {
  const CreateExam = 0;
  const Exam = 1;
  const [tab, setTab] = useState(CreateExam);
  const [pin, setPIN] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log(isCollapsed);

  const titleTextFieldStyled = {
    width: "100%",
    fontSize: "20px",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontWeight: "400",
    lineHeight: "1.0",
    color: "#000000",
    background: "#ffffff",
    border: "none",
    borderRadius: "10px",
    alignItems: "center",
  };
  const generatePINTextFieldStyled = {
    width: "100%",
    fontSize: "20px",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontWeight: "400",
    lineHeight: "1.0",
    color: "#000000",
    background: "#ffffff",
    border: "none",
    borderRadius: "10px",
    marginTop: "10px",
    alignItems: "center",
  };

  const numberTextFieldStyled = {
    width: "100%",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "1.0",
    color: "#000000",
    background: "#ffffff",
    border: "none",
    borderRadius: "20px",
    marginTop: "10px",
  };
  const questionNameTextFieldStyled = {
    width: "100%",
    fontSize: "18px",
    fontWeight: "400",
    color: "#000000",
    background: "#ffffff",
    border: "none",
    borderRadius: "20px",
    marginTop: "10px",
    alignItems: "center",
  };

  const textCardStyled = {
    width: "100%",
    height: 50,
    fontSize: "18px",
    alignItems: "center",
    justifyContent: "left",
    display: "flex",
    marginTop: "10px",
    paddingLeft: 3,
    color: "#000",
  };

  const titleStyled = {
    width: 200,
    height: 60,
    borderRadius: 5,
    fontSize: 24,
    alignItems: "center",
    display: "flex",
    paddingLeft: 4,
    color: "#fff",
  };

  const tabCreateExamStyled = {
    width: 200,
    height: 60,
    borderRadius: 5,
    fontSize: 28,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: tab === CreateExam ? "#fff" : "transparent",
    color: tab === CreateExam ? "#000" : "#fff",
  };

  const tabExamStyled = {
    width: 150,
    height: 60,
    borderRadius: 5,
    fontSize: 28,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: tab === Exam ? "#fff" : "transparent",
    color: tab === Exam ? "#000" : "#fff",
  };

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

  const onChangeGenPin = () => (event) => {
    //to do ...
  };

  const autoGeneratePIN = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var pinLength = 6;
    var pin = "";
    for (let i = 0; i < pinLength; i++) {
      pin += chars[Math.floor(Math.random() * chars.length)];
    }
    setPIN(pin);
  };

  return (
    <React.Fragment>
      <Box>
        <HeaderForTeacher />
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 20 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                setTab(0);
              }}
            >
              <Typography
                sx={tabCreateExamStyled}
                onclick={() => {
                  setTab(0);
                }}
              >
                สร้างข้อสอบ
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                setTab(1);
              }}
            >
              <Typography
                sx={tabExamStyled}
                onclick={() => {
                  setTab(1);
                }}
              >
                ข้อสอบ
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {tab === CreateExam ? (
          <Box sx={{ marginTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography sx={titleStyled}>ชื่อเรื่อง</Typography>
              </Grid>
              <Grid item container xs={10}>
                <FormControl variant="outline" focus="false">
                  <OutlinedInput
                    sx={titleTextFieldStyled}
                    type="text"
                    id="title"
                    onChange={onChangeTitle("title")}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={2} sx={{ marginTop: "10px" }}>
                <Typography sx={titleStyled}>สร้าง PIN</Typography>
              </Grid>
              <Grid item container xs={10}>
                <FormControl variant="outline">
                  <OutlinedInput
                    sx={generatePINTextFieldStyled}
                    type="text"
                    id="gen-pin"
                    value={pin}
                    onChange={onChangeGenPin(pin)}
                    endAdornment={
                      <IconButton onClick={autoGeneratePIN}>
                        <ShuffleIcon />
                      </IconButton>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

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
                  <Grid container spacing={4}>
                    <Grid item xs={1}>
                      <Typography sx={textCardStyled}>ข้อที่</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <FormControl variant="outline" focus="false">
                        <OutlinedInput
                          sx={numberTextFieldStyled}
                          type="text"
                          id="number-question"
                          onChange={() => {}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={textCardStyled}>คำถาม</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl variant="outline" focus="false">
                        <OutlinedInput
                          sx={questionNameTextFieldStyled}
                          type="text"
                          id="question"
                          onChange={() => {}}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
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
    </React.Fragment>
  );
};
export default CreateExam;
