import "./Dashboard.scss";

import createExamIcon from "../../assets/icons/create-exam.svg";
import resultExamIcon from "../../assets/icons/result-exam.svg";

import React from "react";
import { useHistory } from "react-router-dom";

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DashBoard = () => {
  const history = useHistory();
  const textStyle = {
    color: "text.primary",
    fontWeight: "bold",
  };

  const onClickCreateExamButton = () => {
    history.push("/teacher/create-exam");
  };

  const onClickResultExamButton = () => {
    history.push("/teacher/resultpage");
  };

  return (
    <React.Fragment>
      <HeaderWithIcon
        title="ยินดีต้อนรับ"
        description="มาเริ่มสร้างข้อสอบกันเลย"
        icon={null}
      />
      <div className="button-group">
        <Stack direction="row" spacing={10}>
          <Button
            variant="contained"
            className="create-exam"
            onClick={onClickCreateExamButton}
            sx={textStyle}
          >
            <img src={createExamIcon}></img>
            <p>สร้างข้อสอบ</p>
          </Button>
          <Button
            variant="contained"
            className="result-exam"
            onClick={onClickResultExamButton}
            sx={textStyle}
          >
            <img src={resultExamIcon}></img>
            <p>ผลการทดสอบ</p>
          </Button>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default DashBoard;
