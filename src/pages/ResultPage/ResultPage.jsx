import "./ResultPage.scss";
import React from "react";
import InfoCard from "../../components/info-card/info-card";

import { Button, TableCell } from "@material-ui/core";
import { data } from "jquery";

const ResultPage = () => {
  let heading = ["Item Question", "Click Time", "Reaction Time", "Emotion"];
  let body = [["1"], ["2"], ["3"], ["4"]];
  return (
    <React.Fragment>
      <div className="card-result-page">
        <InfoCard
          title={
            <div className="result-header">
              <h1>รายงานวิเคราะห์การทำข้อสอบรายบุคคล</h1>
              <label>
                ชื่อ {data.name} นามสกุล <br />
                รหัส <br />
                คณะ สาขา <br />
              </label>
              <hr />
            </div>
          }
          description={
            <div>
              <div className="result-body">
                <table className="result-table">
                  <thead>
                    <tr role="row">
                      {heading.map((head) => (
                        <th>{head}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {body.map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
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
