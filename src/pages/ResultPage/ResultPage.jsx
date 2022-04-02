import "./ResultPage.scss";
import React from "react";
import InfoCard from "../../components/info-card/info-card";

import { Button, TableCell } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
const ResultPage = () => {
  let heading = ["Item Question", "Reaction Time", "Emotion"];
  let rows = [
    [["1"], ["2"], ["3"]],
    [["1"], ["2"], ["3"]],
    [["1"], ["2"], ["3"]],
  ];
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      maxWidth: 1100,
    },
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="card-result-page">
        <InfoCard
          title={
            <div className="result-header">
              <h1>รายงานวิเคราะห์การทำข้อสอบโดยรวม</h1>
              <label>
                วิชา <br />
                วันที่ <br />
              </label>
              <hr />
            </div>
          }
          description={
            <div>
              <div className="result-body">
                {/* <table className="result-table">
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
                        <tr>{val}</tr>
                      ))}
                    </tr>
                  </tbody>
                </table> */}
                <TableContainer className="table-container">
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>ITEM QUESTION</TableCell>
                        <TableCell align="center">
                          REACTION TIME (Sec.)
                        </TableCell>
                        <TableCell align="center">EMOTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.ItemQuestion}>
                          <TableCell component="th" scope="row">
                            {row.ItemQuestion}
                          </TableCell>
                          <TableCell align="center">{row.ClickTime}</TableCell>
                          <TableCell align="center">
                            {row.ReactionTime}
                          </TableCell>
                          <TableCell align="center">{row.Emotion}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <center>
                <div className="result-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="submit-exam"
                  >
                    บันทึกผลทดสอบ
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
