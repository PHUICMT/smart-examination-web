import "./CreateExam.scss";

import React, { useState } from "react";

import HeaderForTeacher from "../../components/header-for-teacher/header-for-teacher";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";

const CreateExam = () => {
  const CreateExam = 0;
  const Exam = 1;
  const [tab, setTab] = useState(CreateExam);

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
              onClick={() => {
                setTab(0);
              }}
            >
              <Typography
                sx={{
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
                }}
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
              onClick={() => {
                setTab(1);
              }}
            >
              <Typography
                sx={{
                  width: 200,
                  height: 60,
                  borderRadius: 5,
                  fontSize: 28,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  cursor: "pointer",
                  backgroundColor: tab === Exam ? "#fff" : "transparent",
                  color: tab === Exam ? "#000" : "#fff",
                }}
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
          <Box>
            <Typography sx={{ display: "flex" }}>สร้างข้อสอบ</Typography>
          </Box>
        ) : (
          <Typography>ข้อสอบ</Typography>
        )}
      </Container>
    </React.Fragment>
  );
};
export default CreateExam;
