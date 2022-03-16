import "./ExamPage.scss";
import "bulma";

import React from "react";
import InfoCard from "../../components/info-card/info-card";
import { Checkbox, FormGroup } from "@mui/material/";

import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@material-ui/core";

const ExamPage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <React.Fragment>
      <InfoCard
        className="exam-card"
        title="1. ขั้นตอนการพัฒนาอัลกอริทึมเพื่อแก้ปัญหา (Develops the algorithm for solution)หมายถึงข้อใด"
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
        input={null}
        icon={null}
        marginTop={100}
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
    </React.Fragment>
  );
};

export default ExamPage;
