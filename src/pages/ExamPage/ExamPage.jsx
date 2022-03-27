import "./ExamPage.scss";
import "bulma";

import React, { useState, useEffect } from "react";
import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import InfoCard from "../../components/info-card/info-card";
import { CheckBoxExam, RadioBoxExam, TextFieldExam } from "../../components/exam-item/exam-item";

import studentIcon from "../../assets/image/student-icon.png";
import Button from "@material-ui/core/Button";
import Modal from "../../components/modal-notification/moodal-notification";
import HandleRecorder from "../../services/video-record"
import { handleOnSendExamResult } from "../../services/result-sender"

let scopeTimePerItem = [];
let startHoverTimeStamp = [];

let examItemsTimeStamp = [];
let resultPerItems = [];
let startAndEndTime = [-1, -1];

let handleRecorder = HandleRecorder()

const ExamPage = (props) => {
  const [show, setShow] = useState(false);

  const [exampin, setExampin] = useState("ABC1234");
  const [studentId, setStudentId] = useState("07610497");
  const [subject, setSubject] = useState("Computer");

  useEffect(() => {
    if (
      props.studentId !== undefined &&
      props.subject !== undefined &&
      props.exampin !== undefined
    ) {
      setStudentId(props.studentId);
      setSubject(props.subject);
      setExampin(props.exampin);
    }
  }, [])

  useEffect(() => {
    handleRecorder.setUpStudentId(studentId)
    handleRecorder.setUpSupject(subject)
    handleRecorder.setUpExamPin(exampin)
    handleRecorder.startRecord() //TODO Mock to start webcam
    startAndEndTime[0] = getCurrentTime()
  }, [])

  function getCurrentTime() {
    var now = Math.round((new Date()).getTime());
    return now;
  }

  //TODO Data From Database should get this data from props
  const allItems = [
    {
      article: 1,
      type: 'Radio',
      data: {
        title: '1. ขั้นตอนการพัฒนาอัลกอริทึมเพื่อแก้ปัญหา(Develops the algorithm for solution) หมายถึงข้อใด',
        items: ["เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม", "อัลกอริทึมในที่นี้หมายถึงสูตรทางคณิตศาสตร์ที่ใช้สำหรับในการแก้ปัญญา", "การวางแผนการเขียนโปรแกรม ด้วยการออกแบบให้มีเวลาการประมวลผล คือผังงาน(Flowchart)"]
      }
    },
    {
      article: 2,
      type: 'TextField',
      data: {
        title: '2. เขียนโค้ดที่แสดงถึง MVC'
      }
    },
    {
      article: 3,
      type: 'CheckBox',
      data: {
        title: '3. ข้อใดบ้างที่เกี่ยวของกับ React',
        items: ["Fontend", "Library", "Client"]
      }
    }
  ]

  const totalItems = allItems.length;
  //Prepairing default data
  if (scopeTimePerItem.length !== totalItems) {
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
    }
    const handleOnMouseLeave = () => {
      if (onHover) {
        onHover = false;
        var before = (startHoverTimeStamp[index] - startAndEndTime[0]);
        var now = (getCurrentTime() - startAndEndTime[0]);
        var sumTime = now - before;
        scopeTimePerItem[index] += sumTime;
        examItemsTimeStamp[index] = [...examItemsTimeStamp[index], [before, now]];
      }
    }

    function handleOnValueChange(valueCallback) {
      resultPerItems[index] = valueCallback;
    }

    const ExamItem = () => {
      if (type !== undefined) {
        switch (type) {
          case 'Radio':
            return <RadioBoxExam onValueChange={handleOnValueChange} title={detail.title} items={detail.items} />
          case 'CheckBox':
            return <CheckBoxExam onValueChange={handleOnValueChange} title={detail.title} items={detail.items} />
          case 'TextField':
            return <TextFieldExam onValueChange={handleOnValueChange} title={detail.title} />
          default:
            return undefined
        }
      } else {
        return undefined
      }
    }

    if (ExamItem !== undefined) {
      return (
        <div key={index} id={`${index}`} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave} >
          <ExamItem />
        </div>
      )
    }

    return undefined;
  }

  function handleOnConfirm() {
    startAndEndTime[1] = getCurrentTime()
    handleRecorder.stopRecord()

    const packedData = {
      examPin: exampin,
      studentId: studentId,
      resultPerItems: resultPerItems,
      startAndEndTime: startAndEndTime,
      examItemsTimeStamp: examItemsTimeStamp,
    }
    const jsonData = JSON.stringify(packedData);
    console.log(packedData);
    handleOnSendExamResult(jsonData);
  }

  return (
    <React.Fragment>
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

        {
          allItems.map((data, index) => {
            const type = data.type
            const detail = data.data

            return (
              getExamByType(type, detail, index)
            )
          })
        }
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
          show={show}>
          <p>คุณต้องการส่งแบบฟอร์มใช่หรือไม่</p>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ExamPage;
