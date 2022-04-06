import "./CreateExam.scss";

import React, { useState, useEffect, useRef } from "react";

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
  const [itemRadio, setItemRadio] = useState([]);
  const [valueRadio, setValueRadio] = useState("");
  const [itemCheckBox, setItemCheckBox] = useState([]);
  const [resultCheckBox, setResultCheckBox] = useState({});
  const [valueCheckBox, setValueCheckBox] = useState([]);
  const [content, setContent] = useState();
  const [width, setWidth] = useState(20);
  const span = useRef();

  const addCardButtonStyled = {
    width: "100%",
    height: 100,
  };

  const AddCard = (type, question, result, resultCheckBox) => {
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
        items: itemRadio,
      };
    } else if (type === "CheckBox") {
      card = {
        type: type,
        question: question,
        result: resultCheckBox,
        items: itemCheckBox,
      };
    }

    cardList.push(card);
    setCardList(cardList);
  };

  const addRadio = () => {
    if (valueRadio !== "") {
      console.log(valueRadio);
      setItemRadio([...itemRadio, valueRadio]);
      setValueRadio("");
    }
  };

  const addCheckBox = () => {
    console.log(valueCheckBox);
    if (valueCheckBox !== "") {
      setItemCheckBox([...itemCheckBox, valueCheckBox]);
      setValueCheckBox("");
    }
  };

  const onChangeTextAddRadio = (event) => {
    setValueRadio(event.target.value);
    if (event.target.value.length > 20) {
      setWidth(event.target.value.length);
    } else {
      setWidth(20);
    }
  };

  const onChangeTextAddCheckBox = (event) => {
    setValueCheckBox(event.target.value);
  };

  const onChangeTitle = () => (event) => {};
  const onChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const onChangeResult = (event) => {
    setResult(event);
  };

  const onChangeResultCheckBox = (event) => {
    setResultCheckBox({
      ...resultCheckBox,
      [event.target.id]: event.target.checked,
    });
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
                onChangeResult={(event) => {
                  onChangeResult(event.target.value);
                }}
                onValueChangeQuestion={onChangeQuestion}
                question={true}
                items={itemRadio}
                onClickAddRadio={addRadio}
                onChangeTextAddRadio={onChangeTextAddRadio}
                valueRadio={valueRadio}
                style={width}
              />
            ) : type === CheckBoxType ? (
              <CheckBoxExam
                title="คำถาม"
                onChangeResult={(event) => {
                  onChangeResultCheckBox(event);
                }}
                onValueChangeQuestion={onChangeQuestion}
                question={true}
                items={itemCheckBox}
                onClickAddCheckBox={addCheckBox}
                onChangeTextAddCheckBox={onChangeTextAddCheckBox}
                valueCheckBox={valueCheckBox}
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
            AddCard(type, question, result, resultCheckBox);
            setIsCollapsed(false);
            setType();
            setItemRadio([]);
            setItemCheckBox([]);
            setResultCheckBox({});
            setResult();
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
            setItemRadio([]);
            setItemCheckBox([]);
            setResultCheckBox({});
            setResult();
          }}
        >
          ยกเลิก
        </Button>
      </div>

      <div>
        {cardList.map((data, index) => {
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
                  items={data.items}
                  value={data.result}
                  question={false}
                />
              ) : data.type === "CheckBox" ? (
                <CheckBoxExam
                  title={data.question}
                  items={data.items}
                  value={data.result}
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
