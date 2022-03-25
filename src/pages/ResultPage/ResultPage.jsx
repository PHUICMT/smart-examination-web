import "./ResultPage.scss";
import React from "react";
import InfoCard from "../../components/info-card/info-card";

import { Button } from "@material-ui/core";

const ResultPage = () => {
  return (
    <React.Fragment>
      <div className="card-result-page">
        <InfoCard
          title={
            <div className="result-header">
              <h1>รายงานวิเคราะห์การทำข้อสอบรายบุคคล</h1>
              <label>
                ชื่อ นามสกุล <br />
                รหัส <br />
                คณะ สาขา <br />
              </label>
              <hr />
            </div>
          }
          description={
            <div>
              <center>
                <div className="result-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="submit-exam"
                  >
                    ยืนยัน
                  </Button>
                </div>
              </center>
            </div>
          }
          icon={null}
          input={null}
          marginTop={100}
        />
      </div>
    </React.Fragment>
  );
};

export default ResultPage;
