import "./EnterPin.scss";

import React from "react";
import InfoCard from "../../components/info-card/info-card";

import { Button } from "@material-ui/core";

const EnterPin = () => {
  return (
    <React.Fragment>
      <div className="title">
        <h1>กรุณากรอกรหัสเพื่อเข้าสอบ</h1>
      </div>
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
                />
              </div>
              <div className="exam-button">
                <Button
                  variant="contained"
                  size="large"
                  className="submit-exam"
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
    </React.Fragment>
  );
};

export default EnterPin;
