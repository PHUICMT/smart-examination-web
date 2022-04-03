import "./EnterPin.scss";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import InfoCard from "../../components/info-card/info-card";
import { handleOnGetExam } from "../../services/get-exam-item"

import { Button } from "@material-ui/core";

const EnterPin = () => {
  const history = useHistory();
  const [examPin, setExamPin] = useState("");

  async function handleOnConfirm() {
    handleOnGetExam(examPin).then(res => {
      if (res.exam_items !== false && res.exam_items !== undefined) {
        history.push("/student/exampage",
          {
            examPin: examPin,
            data: res.exam_items
          });
      }
    });
  }

  return (
    <React.Fragment>
      <div className="title">
        <h1>กรุณากรอกรหัสเพื่อเข้าสอบ</h1>
      </div>
      <div className="card-enter-pin">
        <InfoCard
          title={null}
          description={
            <form>
              <center>
                <div className="form-enter-pin">
                  <input
                    type="text"
                    name="enter-pin"
                    placeholder="กรอกรหัส"
                    maxLength="12"
                    onChange={(e) => setExamPin(e.target.value)}
                  />
                </div>
                <div className="exam-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="submit-exam"
                    onClick={() => handleOnConfirm()}
                  >
                    ยืนยัน
                  </Button>
                </div>
              </center>
            </form>
          }
          icon={null}
          input={null}
          marginTop={100}
        />
      </div>
    </React.Fragment>
  );
};

export default EnterPin;
