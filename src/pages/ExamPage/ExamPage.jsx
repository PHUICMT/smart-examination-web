import "./ExamPage.scss";
import "bulma";

import React from "react";
import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import InfoCard from "../../components/info-card/info-card";
import { Checkbox, FormGroup } from "@mui/material/";
import studentIcon from "../../assets/image/student-icon.png";
import Button from "@material-ui/core/Button";

import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@material-ui/core";

const ExamPage = () => {
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

      <InfoCard
        className="exam-card"
        title="1. ขั้นตอนการพัฒนาอัลกอริทึมเพื่อแก้ปัญหา(Develops the algorithm for solution) หมายถึงข้อใด"
        description={null}
        icon={null}
        marginTop={100}
        input={
          <FormControl className="radio-group">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="anserOne"
                control={<Radio />}
                label="เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม"
              />
              <FormControlLabel
                value="anserTwo"
                control={<Radio />}
                label="เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม"
                color="success"
              />
              <FormControlLabel
                value="anserThree"
                control={<Radio />}
                label="อัลกอริทึมในที่นี้หมายถึงสูตรทางคณิตศาสตร์ที่ใช้สำหรับในการแก้ปัญญา"
              />
              <FormControlLabel
                value="anserFour"
                control={<Radio />}
                label="การวางแผนการเขียนโปรแกรม ด้วยการออกแบบให้มีเวลาการประมวลผล คือผังงาน(Flowchart)"
              />
            </RadioGroup>
          </FormControl>
        }
      />

      <InfoCard
        className="exam-card"
        title="2. เขียนโค้ดที่แสดงถึง MVC"
        description={
          <form>
            <div className="form-group">
              <textarea
                class="textarea has-fixed-size"
                placeholder="เขียนคำตอบ"
              ></textarea>
            </div>
          </form>
        }
        icon={null}
        marginTop={100}
        input={null}
      />

      <InfoCard
        className="exam-card"
        title="3. ข้อใดบ้างที่เกี่ยวของกับ React"
        description={null}
        icon={null}
        marginTop={100}
        input={
          <div>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Javascript" />
              <FormControlLabel control={<Checkbox />} label="Fontend" />
              <FormControlLabel control={<Checkbox />} label="Library" />
              <FormControlLabel control={<Checkbox />} label="Client" />
            </FormGroup>
          </div>
        }
      />
      <div className="exam-button">
        <Button variant="contained" size="large" className="submit-exam">
          ยืนยัน
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ExamPage;
