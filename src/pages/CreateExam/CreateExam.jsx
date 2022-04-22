import "./CreateExam.scss";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const CreateExam = 0;
  const Exam = 1;
  const CheckBoxType = "CheckBox";
  const RadioBoxType = "Radio";
  const TextFieldType = "TextField";
  const examSubject = location.state.data;

  const [tab, setTab] = useState(CreateExam);
  const [pin, setPIN] = useState();
  const [examTitle, setExamTitle] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [type, setType] = useState();
  const [question, setQuestion] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [result, setResult] = useState("");
  const [cardList, setCardList] = useState([]);
  const [itemRadio, setItemRadio] = useState([]);
  const [valueRadio, setValueRadio] = useState("");
  const [itemCheckBox, setItemCheckBox] = useState([]);
  const [resultCheckBox, setResultCheckBox] = useState({});
  const [valueCheckBox, setValueCheckBox] = useState([]);
  const [width, setWidth] = useState(20);
  const [status, setStatus] = useState("create");
  const [questionUpdate, setQuestionUpdate] = useState("");
  const [show, setShow] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [indexX, setIndexX] = useState(0);
  const [resultRadioUpdate, setResultRadioUpdate] = useState("");

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

  const UpdateCard = (type, questionUpdate, indexX) => {
    let length = cardList.length;
    console.log(type);
    console.log(questionUpdate);
    console.log(indexX);
    for (let i = 0; i < length; i++) {
      if (cardList[i].article === indexX + 1) {
        if (type === "TextField") {
          console.log(questionUpdate);
          cardList[i].data.title = questionUpdate;
          console.log(cardList[i].data.title);
        }
      }
    }
    console.log(cardList);
    setCardList(cardList);
    setStatus("create");
    setType();
    handleOnCreateExam();
  };

  const DeleteCard = () => {
    console.log(indexX);
    for (let i = 0; i < cardList.length; i++) {
      if (cardList[i].article === indexX + 1) {
        cardList.splice(i, 1);
      }
    }
    for (let i = 0; i < cardList.length; i++) {
      cardList[i].article = i + 1;
    }
    console.log(cardList);
    setCardList(cardList);
    setStatus("create");
    setType();
    handleOnCreateExam();
  };

  async function handleOnCreateExam() {
    console.log("teacher id: " + teacherID);
    const data = {
      exam_pin: pin,
      exam_subject: examSubject,
      exam_title: examTitle,
      exam_description: examDescription,
      teacher_id: teacherID,
      exam_items: cardList,
    };
    await saveExam(data);
  }

  const addRadio = () => {
    if (valueRadio !== "") {
      console.log("value: " + valueRadio);
      console.log("status: " + status);
      console.log("index: " + indexX);
      if (status === "edit") {
        for (let i = 0; i < cardList.length; i++) {
          console.log("data: " + cardList[i].article);
          if (cardList[i].article === indexX + 1) {
            cardList[i].data.items.push(valueRadio);
          }
        }
      }
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
    console.log(valueRadio);
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

  const handleOpen = () => {
    setShow(true);
  };

  const handleOpenDelete = () => {
    setShowModalDelete(true);
  };

  const onDelete = (indexX, type) => {
    setIndexX(indexX);
    setType(type);
  };

  const onClickExamType = (type) => {
    setType(type);
  };

  const AddCardButton = () => {
    return (
      <div>
        <Button
          variant="outlined"
          sx={{
            height: "50px",
            width: "150px",
            marginTop: "20px !important",
            backgroundColor: "#fff !important",
            borderRadius: "10px !important",
          }}
          onClick={() => {
            AddCard(type, question, result, resultCheckBox);
            setIsCollapsed(false);
            setType();
            setItemRadio([]);
            setValueRadio();
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
            marginTop: "20px !important",
            backgroundColor: "#fff !important",
            borderRadius: "10px !important",
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
    );
  };

  const SaveCardButton = () => {
    return (
      <div>
        <Button
          variant="outlined"
          sx={{
            height: "50px",
            width: "150px",
            marginTop: "20px !important",
            backgroundColor: "#fff !important",
            borderRadius: "10px !important",
          }}
          onClick={() => {
            UpdateCard(type, questionUpdate, indexX);
          }}
        >
          บันทึก
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: "50px",
            width: "150px",
            marginTop: "20px !important",
            backgroundColor: "#fff !important",
            borderRadius: "10px !important",
          }}
          onClick={() => {
            setStatus("create");
          }}
        >
          ยกเลิก
        </Button>
      </div>
    );
  };

  useEffect(() => {
    let sessionUserId = window.sessionStorage.getItem("userId");
    if (sessionUserId && sessionUserId !== null) {
      setTeacherID(sessionUserId);
    }
    autoGeneratePIN();
  }, [teacherID]);

  return (
    <React.Fragment>
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
            <Typography
              sx={{
                display: "flex",
                fontSize: "32px",
                color: "#fff",
              }}
            >
              วิชา {examSubject}
            </Typography>
            <TitleWithInput
              title="ชื่อเรื่อง"
              onChange={(event) => {
                setExamTitle(event.target.value);
              }}
              disabled={false}
            />
            <TitleWithInput
              title="รายละเอียด"
              onChange={(event) => {
                setExamDescription(event.target.value);
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
            ) : type === TextFieldType && status === "create" ? (
              <>
                <TextFieldExam
                  title="คำถาม"
                  onValueChangeQuestion={onChangeQuestion}
                  question={true}
                  showModifyButton={false}
                />
                <AddCardButton />
              </>
            ) : type === RadioBoxType && status === "create" ? (
              <>
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
                <AddCardButton />
              </>
            ) : type === CheckBoxType && status === "create" ? (
              <>
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
                <AddCardButton />
              </>
            ) : (
              <div className="form-select-type">
                <Button
                  className="select-textfield"
                  onClick={() => {
                    onClickExamType(TextFieldType);
                    setStatus("create");
                  }}
                >
                  Textfield
                </Button>
                <Button
                  className="select-radio"
                  onClick={() => {
                    onClickExamType(RadioBoxType);
                    setItemRadio([]);
                    setStatus("create");
                  }}
                >
                  Radio
                </Button>
                <Button
                  className="select-checkbox"
                  onClick={() => {
                    onClickExamType(CheckBoxType);
                    setStatus("create");
                  }}
                >
                  Checkboxes
                </Button>
              </div>
            )}

            <div>
              {cardList.map((card, index) => {
                return (
                  <div key={index}>
                    {card.type === "TextField" ? (
                      status === "edit" && index === indexX ? (
                        <>
                          <TextFieldExam
                            title="คำถาม"
                            onValueChangeQuestion={(event) => {
                              setQuestionUpdate(event.target.value);
                            }}
                            value={questionUpdate}
                            question={true}
                            showModifyButton={true}
                          />
                          <SaveCardButton />
                        </>
                      ) : (
                        <>
                          <TextFieldExam
                            title={card.data.title}
                            description={card.result}
                            question={false}
                            showModifyButton={true}
                            onClickEdit={() => {
                              setStatus("edit");
                              setQuestionUpdate(card.data.title);
                              setIndexX(index);
                              setType(card.type);
                            }}
                            onClickDelete={() => {
                              setStatus("delete");
                              onDelete(index, card.type);
                              setIndexX(index);
                              setType(card.type);
                              handleOpenDelete();
                            }}
                          />
                          <Modal
                            title="แจ้งเตือนการลบ"
                            show={showModalDelete}
                            onClose={() => {
                              setShowModalDelete(false);
                              setType();
                            }}
                            onConfirm={() => {
                              DeleteCard();
                            }}
                          >
                            <p>คุณต้องการลบข้อสอบข้อนี้ใช่หรือไม่</p>
                          </Modal>
                        </>
                      )
                    ) : card.type === "Radio" ? (
                      status === "edit" && index === indexX ? (
                        <>
                          <RadioBoxExam
                            title="คำถาม"
                            onValueChangeQuestion={(event) => {
                              setQuestionUpdate(event.target.value);
                            }}
                            items={card.data.items}
                            value={questionUpdate}
                            result={card.result}
                            question={true}
                            showModifyButton={true}
                            onClickAddRadio={addRadio}
                            onChangeTextAddRadio={onChangeTextAddRadio}
                            onChangeResult={(event) => {
                              setResultRadioUpdate(event.target.value);
                            }}
                            valueRadio={valueRadio}
                          />
                          <SaveCardButton />
                        </>
                      ) : (
                        <>
                          <RadioBoxExam
                            title={card.data.title}
                            items={card.data.items}
                            value={card.result}
                            question={false}
                            showModifyButton={true}
                            onClickEdit={() => {
                              console.log(card.data.items);
                              setStatus("edit");
                              setQuestionUpdate(card.data.title);
                              setResultRadioUpdate(card.result);
                              setIndexX(index);
                              setType(card.type);
                            }}
                            onClickDelete={() => {
                              console.log("delete card");
                              setStatus("delete");
                              onDelete(index, card.type);
                              setIndexX(index);
                              setType(card.type);
                              handleOpenDelete();
                            }}
                          />
                          <Modal
                            title="แจ้งเตือนการลบ"
                            show={showModalDelete}
                            onClose={() => {
                              setShowModalDelete(false);
                              setType();
                            }}
                            onConfirm={() => {
                              DeleteCard();
                            }}
                          >
                            <p>คุณต้องการลบข้อสอบข้อนี้ใช่หรือไม่</p>
                          </Modal>
                        </>
                      )
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
              <Modal
                title="แจ้งเตือน"
                show={show}
                onClose={() => setShow(false)}
              >
                <p>คุณต้องการส่งแบบฟอร์มใช่หรือไม่</p>
              </Modal>
            </div>
          </Box>
        ) : (
          <Typography component={"span"}>ข้อสอบ</Typography>
        )}
      </Container>
    </React.Fragment>
  );
};
export default CreateExam;
