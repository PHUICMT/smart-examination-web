import "./Dashboard.scss";

import createExamIcon from "../../assets/icons/create-exam.svg";
import resultExamIcon from "../../assets/icons/result-exam.svg";

import React from "react";

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DashBoard = () => {
  return (
    <React.Fragment>
      <HeaderWithIcon
        title="ยินดีต้อนรับ"
        description="มาเริ่มสร้างข้อสอบกันเลย"
        icon={null}
      />
      <div className="button-group">
        <Stack direction="row" spacing={10}>
          <Button variant="contained" className="create-exam">
            <img src={createExamIcon}></img>
            <p>สร้างข้อสอบ</p>
          </Button>
          <Button variant="contained" className="result-exam">
              <img src={resultExamIcon}></img>
              <p>ผลการทดสอบ</p>
          </Button>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default DashBoard;
