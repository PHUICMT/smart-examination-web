import "./CreateExam.scss";

import React, { useState, useEffect } from "react";

import HeaderForTeacher from "../../components/header-for-teacher/header-for-teacher";
import TitleWithInput from "../../components/title-with-input/title-with-input";
import TabBar from "../../components/tab-bar/tab-bar";
import Modal from "../../components/modal-notification/moodal-notification";
import {
  CheckBoxExam,
  RadioBoxExam,
  TextFieldExam,
} from "../../components/exam-item/exam-item";

import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CreateExam = () => {
  const CreateExam = 0;
  const Exam = 1;
  const CheckBoxType = "CheckBox";
  const RadioBoxType = "Radio";
  const TextFieldType = "TextField";
  const [tab, setTab] = useState(CreateExam);
  const [pin, setPIN] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [type, setType] = useState();
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [cardList, setCardList] = useState([]);

  const addCardButtonStyled = {
    width: "100%",
    height: 100,
  };

  const AddCard = (type, question, result) => {
    let card;
    if (type === "TextField") {
      card = {
        type: type,
        question: question,
        result: result,
      };
    } else if (type === "Radio") {
      card = {
        type: type,
        question: question,
        result: result,
        items: ["Newii", "Sukorn", "PhuICMT"],
      };
    } else if (type === "TextField") {
      card = {
        type: type,
        question: question,
        result: result,
        items: ["Newii", "Sukorn", "PhuICMT"],
      };
    }

    cardList.push(card);
    setCardList(cardList);
    console.log(cardList);
  };

  const addRadio = (item) => {
    let optionRadio;
    optionRadio = { item };
  };

  const onChangeTitle = () => (event) => {};

  const onChangeQuestion = (event) => {
    console.log(event.target.value);
    setQuestion(event.target.value);
  };

  const onChangeResult = (event) => {
    console.log(event.target.value);
    setResult(event.target.value);
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

  const onClickExamType = (type) => {
    console.log(type);
    setType(type);
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
            ) : type === TextFieldType ? (
              <TextFieldExam
                title="คำถาม"
                onValueChange={(event) => {
                  console.log(event.target);
                }}
                onValueChangeQuestion={onChangeQuestion}
                question={true}
              />
            ) : type === RadioBoxType ? (
              <RadioBoxExam
                title="คำถาม"
                onChangeResult={onChangeResult}
                onValueChangeQuestion={onChangeQuestion}
                question={true}
                items={[1, 2, 3, 4, 5]}
              />
            ) : type === CheckBoxType ? (
              <CheckBoxExam
                title="Add Exams"
                onChangeResult={onChangeResult}
                onValueChangeQuestion={onChangeQuestion}
                question={true}
                items={[
                  <Button
                    sx={{
                      height: "50px",
                      width: "150px",
                      marginTop: "20px",
                      backgroundColor: "#fff",
                      border: "50%",
                    }}
                    onClick={addRadio}
                  ></Button>,
                ]}
              />
            ) : (
              <div className="form-select-type">
                <Button
                  className="select-textfield"
                  onClick={() => {
                    onClickExamType(TextFieldType);
                  }}
                >
                  Textfield
                </Button>
                <Button
                  className="select-radio"
                  onClick={() => {
                    onClickExamType(RadioBoxType);
                  }}
                >
                  Radio
                </Button>
                <Button
                  className="select-checkbox"
                  onClick={() => {
                    onClickExamType(CheckBoxType);
                  }}
                >
                  Checkboxes
                </Button>
              </div>
            )}
          </Box>
        ) : (
          <Typography>ข้อสอบ</Typography>
        )}
      </Container>
      <div>
        <Button
          variant="outlined"
          sx={{
            height: "50px",
            width: "150px",
            marginTop: "20px",
            backgroundColor: "#fff",
          }}
          onClick={() => {
            console.log("type : " + type);
            console.log("คำถาม : " + question);
            console.log("คำตอบ : " + result);
            AddCard(type, question, result);
            setIsCollapsed(false);
            setType();
          }}
        >
          เพิ่มการ์ด
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: "50px",
            width: "150px",
            marginTop: "20px",
            backgroundColor: "#fff",
          }}
          onClick={() => {
            setIsCollapsed(false);
            setType();
          }}
        >
          ยกเลิก
        </Button>
      </div>

      <div>
        {cardList.map((data, index) => {
          console.log(data);
          return (
            <div key={index}>
              {data.type === "TextField" ? (
                <TextFieldExam
                  title={data.question}
                  description={data.result}
                  question={false}
                />
              ) : data.type === "Radio" ? (
                <RadioBoxExam
                  title={data.question}
                  item={data.items}
                  value={data.result}
                  question={false}
                />
              ) : data.type === "CheckBox" ? (
                <CheckBoxType
                  title={data.question}
                  item={data.items}
                  onChangeResult={onChangeResult}
                  question={false}
                />
              ) : null}
            </div>
          );
        })}
      </div>
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
