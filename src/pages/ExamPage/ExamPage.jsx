import "./ExamPage.scss";

import React from 'react';
import InfoCard from "../../components/info-card/info-card"
import {
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
} from "@material-ui/core";

const ExamPage = () => {


    return (
        <React.Fragment>

            <InfoCard
                title="1. ขั้นตอนการพัฒนาอัลกอริทึมเพื่อแก้ปัญหา (Develops the algorithm for solution)หมายถึงข้อใด"
                icon={null}
                marginTop={100}
                radio={
                    <FormControl className="radio-group">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="anserOne" control={<Radio />} label="เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม" />
                            <FormControlLabel value="anserTwo" control={<Radio />} label="เอกสารประกอบโปรแกรมจะช่วยอธิบายถึงจุดประสงค์ของโปรแกรม" />
                            <FormControlLabel value="anserThree" control={<Radio />} label="อัลกอริทึมในที่นี้หมายถึงสูตรทางคณิตศาสตร์ที่ใช้สำหรับในการแก้ปัญญา" />
                            <FormControlLabel value="anserFour" control={<Radio />} label="การวางแผนการเขียนโปรแกรม ด้วยการออกแบบให้มีเวลาการประมวลผล คือผังงาน(Flowchart)" />
                        </RadioGroup>
                    </FormControl>
                }
            />
        </React.Fragment>
    );
};

export default ExamPage;