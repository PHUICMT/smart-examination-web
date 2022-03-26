import "./ExamPage.scss";
import "bulma";

import React, { useState } from "react";
import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import InfoCard from "../../components/info-card/info-card";
import { CheckBoxExam, RadioBoxExam, TextFieldExam } from "../../components/exam-item/exam-item";

import studentIcon from "../../assets/image/student-icon.png";
import Button from "@material-ui/core/Button";
import Modal from "../../components/modal-notification/moodal-notification";

const ExamPage = (props) => {
  const [show, setShow] = useState(false);

  //TODO Data From Database
  const item1 = { //TODO MOCK data
    title: '1. ขั้นตอนการพัฒนาอัลกอริทึมเพื่อแก้ปัญหา(Develops the algorithm for solution) หมายถึงข้อใด',
    items: ["เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม", "อัลกอริทึมในที่นี้หมายถึงสูตรทางคณิตศาสตร์ที่ใช้สำหรับในการแก้ปัญญา", "การวางแผนการเขียนโปรแกรม ด้วยการออกแบบให้มีเวลาการประมวลผล คือผังงาน(Flowchart)"]
  }

  const item2 = { //TODO MOCK data
    title: '2. เขียนโค้ดที่แสดงถึง MVC'
  }

  const item3 = { //TODO MOCK data
    title: '3. ข้อใดบ้างที่เกี่ยวของกับ React',
    items: ["Fontend", "Library", "Client"]
  }

  const allItems = [
    {
      article: 1,
      type: 'Radio',
      data: item1
    },
    {
      article: 2,
      type: 'TextField',
      data: item2
    },
    {
      article: 3,
      type: 'CheckBox',
      data: item3
    }
  ]

  function renderExamByType(type, detail) {
    if (type != undefined) {
      switch (type) {
        case 'Radio':
          return <RadioBoxExam title={detail.title} items={detail.items} />
        case 'CheckBox':
          return <CheckBoxExam title={detail.title} items={detail.items} />
        case 'TextField':
          return <TextFieldExam title={detail.title} />
        default:
          return null
      }
    }
  }

  return (
    <React.Fragment>
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
        allItems.map((data, _) => {
          const type = data.type
          const detail = data.data

          return (
            renderExamByType(type, detail)
          )
        })
      }

      <div className="exam-button">
        <Button
          variant="contained"
          size="large"
          className="submit-exam"
          onClick={() => setShow(true)}
        >
          ยืนยัน
        </Button>
        <Modal title="แจ้งเตือน" onClose={() => setShow(false)} show={show}>
          <p>คุณต้องการส่งแบบฟอร์มใช่หรือไม่</p>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default ExamPage;
