import "./ResultPage.scss";
import Angry from '../../assets/icons/angry-icon.svg'
import Happy from '../../assets/icons/happy-icon.svg'
import Neutral from '../../assets/icons/neutral-icon.svg'
import Sad from '../../assets/icons/sad-icon.svg'
import React from "react";
import InfoCard from "../../components/info-card/info-card";

import { Button, TableCell } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const [examPin, setExamPin] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [averageTimePerQuestion, setAverageTimePerQuestion] = useState(Object);
  const [percentageEmotePerQuestion, setPercentageEmotePerQuestion] = useState(Object);

  useEffect(() => {
    setExamPin(location.state.examPin);
    setSubject(location.state.data.subject_name);
    setDate(location.state.data.created_at);
    setAverageTimePerQuestion(location.state.data.average_time_per_question);
    setPercentageEmotePerQuestion(location.state.data.percent_of_emote_per_question);
  },
    [
      location.state,
      examPin,
      subject,
      date,
      averageTimePerQuestion,
      percentageEmotePerQuestion
    ]);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
      maxWidth: 1100,
    },
  });
  const classes = useStyles();

  const EmotePercent = (emotions) => {
    return (
      <div className="emote-container">
        {
          Object.entries(emotions).map(([key, value]) => {
            let className = `emote ${key}`;

            if (key === 'happy') {
              return <div key={key} className={className}><img src={Happy} alt="happy" /> {value}%</div>
            } else if (key === 'sad') {
              return <div key={key} className={className}><img src={Sad} alt="sad" /> {value}%</div>
            } else if (key === 'angry') {
              return <div key={key} className={className}><img src={Angry} alt="angry" /> {value}%</div>
            } else if (key === 'neutral') {
              return <div key={key} className={className}><img src={Neutral} alt="neutral" /> {value}%</div>
            }
          })
        }
      </div>
    )

  }

  const RowsData = () => {
    return (
      Object.entries(averageTimePerQuestion).map(([key, value]) => {
        return (
          <TableRow key={key}>
            <TableCell component="th" scope="row">{getQuestionTitle(key)}</TableCell>
            <TableCell align="center">{convertMillisecondsToSeconds(value)}</TableCell>
            <TableCell align="center">{EmotePercent(percentageEmotePerQuestion[key])}</TableCell>
          </TableRow>
        );
      }
      ));
  }

  const convertMillisecondsToSeconds = (milliseconds) => {
    return milliseconds / 1000;
  }

  const getQuestionTitle = (question) => {
    return question.toUpperCase().replace('_', ' ');
  }

  return (
    <React.Fragment>
      <div className="card-result-page">
        <InfoCard
          title={
            <div className="result-header">
              <h1>รายงานวิเคราะห์การทำข้อสอบโดยรวม</h1>
              <label>
                วิชา {subject}<br />
                วันที่ {date}<br />
              </label>
              <hr />
            </div>
          }
          description={
            <div>
              <div className="result-body">
                <TableContainer className="table-container">
                  <Table className={classes.table} aria-label="customized table" >

                    <TableHead>
                      <TableRow>
                        <TableCell>ITEM QUESTION</TableCell>
                        <TableCell align="center">REACTION TIME (Sec.)</TableCell>
                        <TableCell align="center">EMOTION</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <RowsData />
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
