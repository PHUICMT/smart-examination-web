import "./ExamPage.scss";
import "bulma";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import InfoCard from "../../components/info-card/info-card";
import {
  CheckBoxExam,
  RadioBoxExam,
  TextFieldExam,
} from "../../components/exam-item/exam-item";
import { LoadingPopup } from "../../components/loading-popup/loading-popup"


import studentIcon from "../../assets/image/student-icon.png";
import Button from "@material-ui/core/Button";
import Modal from "../../components/modal-notification/moodal-notification";
import HandleRecorder from "../../services/video-record";
import { handleOnSendExamResult } from "../../services/result-sender";
import { useLocation } from "react-router-dom";

let scopeTimePerItem = [];
let startHoverTimeStamp = [];

let examItemsTimeStamp = [];
let resultPerItems = [];
let startAndEndTime = [-1, -1];

let handleRecorder = HandleRecorder();

const ExamPage = (props) => {
  const location = useLocation();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [exampin, setExampin] = useState(null);
  const [studentId, setStudentId] = useState("07610497");
  const [subject, setSubject] = useState("Computer");
  const [allItems, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(undefined);

  useEffect(() => {
    handleRecorder.setUpExamPin(location.state.examPin);
    setExampin(location.state.examPin);
    setItems(location.state.data.exam);
    setTotalItems(location.state.data.exam.length);
    setSubject(location.state.data.exam_subject);
    setExampin(location.state.examPin);
    setStudentId(sessionStorage.getItem("userId"));
  }, [
    location.state,
    props.exampin,
    props.studentId,
    props.subject,
    totalItems,
  ]);

  useEffect(() => {
    handleRecorder.setUpStudentId(studentId);
    handleRecorder.setUpSupject(subject);

    setLoading(true);
    handleRecorder.startRecord();
    setTimeout(() => { setLoading(false) }, 2500);

    startAndEndTime[0] = getCurrentTime();
  }, [studentId, subject]);

  function getCurrentTime() {
    return Math.round(new Date().getTime());
  }

  //Prepairing default data
  if (totalItems !== undefined && scopeTimePerItem.length !== totalItems) {
    for (let i = 0; i < totalItems; i++) {
      scopeTimePerItem.push(0);
      startHoverTimeStamp.push(0);
      examItemsTimeStamp.push([]);
      resultPerItems.push(null);
    }
  }

  function getExamByType(type, detail, index) {
    let onHover = false;

    const handleOnMouseOver = () => {
      if (!onHover) {
        onHover = true;
        startHoverTimeStamp[index] = getCurrentTime();
      }
    };
    const handleOnMouseLeave = () => {
      if (onHover) {
        onHover = false;
        var before = startHoverTimeStamp[index] - startAndEndTime[0];
        var now = getCurrentTime() - startAndEndTime[0];
        var sumTime = now - before;
        scopeTimePerItem[index] += sumTime;
        examItemsTimeStamp[index] = [
          ...examItemsTimeStamp[index],
          [before, now],
        ];
      }
    };

    function handleOnValueChange(valueCallback) {
      let value = valueCallback;
      if (typeof (valueCallback) !== typeof ("")) {
        value = valueCallback.target.value;
      }
      resultPerItems[index] = value;
    }

    const ExamItem = () => {
      if (type !== undefined) {
        switch (type) {
          case "Radio":
            return (
              <RadioBoxExam
                onValueChange={handleOnValueChange}
                title={detail.title}
                items={detail.items}
              />
            );
          case "CheckBox":
            return (
              <CheckBoxExam
                onValueChange={handleOnValueChange}
                title={detail.title}
                items={detail.items}
              />
            );
          case "TextField":
            return (
              <TextFieldExam
                onValueChange={handleOnValueChange}
                title={detail.title}
              />
            );
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    };

    if (ExamItem !== undefined) {
      return (
        <div
          key={index}
          id={`${index}`}
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          <ExamItem />
        </div>
      );
    }

    return undefined;
  }

  function handleOnConfirm() {
    startAndEndTime[1] = getCurrentTime();
    handleRecorder.stopRecord();

    const packedData = {
      examPin: exampin,
      studentId: studentId,
      resultPerItems: resultPerItems,
      startAndEndTime: startAndEndTime,
      examItemsTimeStamp: examItemsTimeStamp,
    };
    const jsonData = JSON.stringify(packedData);
    setLoading(true);
    handleOnSendExamResult(jsonData).then((res) => {
      if (res === true) {
        setLoading(false)
        history.push("/index");
      }
    });
  }

  return (
    <React.Fragment>
      <LoadingPopup open={loading} />
      <div className={show ? "noClick" : ""}>
        <div className="title-card">
          <HeaderWithIcon
            title="แบบทดสอบ"
            description="วิชา ศาสตร์การเขียนโปรแกรมขั้นสูง"
            icon={studentIcon}
          />
        </div>

        <div className="head-card">
          <InfoCard
            title={<div className="head"> แบบทดสอบก่อนเรียน</div>}
            description={
              <div className="head">
                ชุดกิจกรรมการเรียนรู้ที่ 1 เรื่อง คอมพิวเตอร์ครอบจักรวาล
              </div>
            }
            icon={null}
            marginTop={100}
            input={null}
          />
        </div>
        {allItems.map((data, index) => {
          const type = data.type;
          const detail = data.data;

          return getExamByType(type, detail, index);
        })}
      </div>
      <div className="exam-button">
        <Button
          variant="contained"
          size="large"
          className="submit-exam"
          onClick={() => setShow(true)}
        >
          ยืนยัน
        </Button>
        <Modal
          title="แจ้งเตือน"
          onConfirm={() => handleOnConfirm()}
          onClose={() => setShow(false)}
          show={show}
        >
          <p>คุณต้องการส่งแบบฟอร์มใช่หรือไม่</p>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ExamPage;
