import "./CreateExam.scss";

import React, { useState, useEffect } from "react";

import HeaderForTeacher from "../../components/header-for-teacher/header-for-teacher";
import TitleWithInput from "../../components/title-with-input/title-with-input";
import TabBar from "../../components/tab-bar/tab-bar";
import Modal from "../../components/modal-notification/moodal-notification";
import { saveExam } from "../../services/save-exam";

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
  const teacherID = "07610442";
  const examSubject = "Computer";
  const [tab, setTab] = useState(CreateExam);
  const [pin, setPIN] = useState();
  const [examTitle, setExamTitle] = useState("");
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
  const [width, setWidth] = useState(20);

  const addCardButtonStyled = {
    width: "100%",
    height: 100,
  };

  const AddCard = (type, question, result, resultCheckBox) => {
    let card;
    if (type === "TextField") {
      card = {
        data: {
          title: question,
        },
        type: type,
        article: cardList.length + 1,
      };
    } else if (type === "Radio") {
      card = {
        data: {
          title: question,
          items: itemRadio,
        },
        result: result,
        type: type,
        article: cardList.length + 1,
      };
    } else if (type === "CheckBox") {
      card = {
        data: {
          title: question,
          items: itemCheckBox,
        },
        result: resultCheckBox,
        type: type,
        article: cardList.length + 1,
      };
    }

    cardList.push(card);
    setCardList(cardList);
    handleOnCreateExam();
  };

  async function handleOnCreateExam() {
    const data = {
      exam_pin: pin,
      exam_subject: examSubject,
      exam_title: examTitle,
      exam_description: "",
      teacher_id: teacherID,
      exam_items: cardList,
    };
    await saveExam(data);
  }

  const addRadio = () => {
    if (valueRadio !== "") {
      setItemRadio([...itemRadio, valueRadio]);
      setValueRadio("");
    }
  };

  const addCheckBox = () => {
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
              onChange={(event) => {
                setExamTitle(event.target.value);
              }}
              disabled={false}
            />
            <TitleWithInput title="PIN" value={pin} disabled={true} />

            {!isCollapsed ? (
              <div className="add-card-container">
                <IconButton
                  size="large"
                  sx={addCardButtonStyled}
                  onClick={() => {
                    setIsCollapsed(true);
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </div>
            ) : type === TextFieldType ? (
              <TextFieldExam
                title="คำถาม"
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
        {cardList.map((card, index) => {
          return (
            <div key={index}>
              {card.type === "TextField" ? (
                <TextFieldExam
                  title={card.data.title}
                  description={card.result}
                  question={false}
                />
              ) : card.type === "Radio" ? (
                <RadioBoxExam
                  title={card.data.title}
                  items={card.data.items}
                  value={card.result}
                  question={false}
                />
              ) : card.type === "CheckBox" ? (
                <CheckBoxExam
                  title={card.data.title}
                  items={card.data.items}
                  value={card.result}
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
