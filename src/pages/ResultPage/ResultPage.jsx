import "./ResultPage.scss";
import Angry from '../../assets/icons/angry-icon.svg'
import Happy from '../../assets/icons/happy-icon.svg'
import Neutral from '../../assets/icons/neutral-icon.svg'
import Sad from '../../assets/icons/sad-icon.svg'
import Download from '../../assets/icons/download-icon.svg'
import Back from '../../assets/icons/retry.svg'

import React from "react";
import InfoCard from "../../components/info-card/info-card";

import {
  Button,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material/';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useHistory } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();
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
            } else {
              return <div></div>
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

  const handleOnSaveResult = () => {
    var container = document.getElementById('report-paper');
    domtoimage.toBlob(container)
      .then(function (blob) {
        saveAs(blob, 'Result.png');
      });
  }

  return (
    <React.Fragment>
      <div className="card-result-page" id="report-paper">
        <InfoCard
          title={
            <div>
              <div className="result-header">
                <div>
                  <h1>รายงานวิเคราะห์การทำข้อสอบโดยรวม</h1>
                  <label>
                    วิชา {subject}<br />
                    วันที่ {date}<br />
                  </label>
                </div>
                <div className="form-emotion">
                  <div className="icon-symbol"><img alt='emote' src={Angry} /><p style={{ color: '#B5453C' }}>Angry</p></div>
                  <div className="icon-symbol"><img alt='emote' src={Happy} /><p style={{ color: '#00D4D4' }}>Happy</p></div>
                  <div className="icon-symbol"><img alt='emote' src={Neutral} /><p style={{ color: '#699DEE' }}>Neutral</p></div>
                  <div className="icon-symbol"><img alt='emote' src={Sad} /><p style={{ color: '#2E3552' }}>Sad</p></div>
                </div>
              </div>
              <hr />
            </div>
          }
          description={
            <div className="report-container">
              <div className="result-body">
                <TableContainer className="table-container">
                  <Table className={classes.table} aria-label="customized table" >

                    <TableHead>
                      <TableRow className="table-head">
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
              <div className="result-button-container">
                <Button
                  onClick={() => handleOnSaveResult()}
                  variant="contained"
                  size="large"
                  className="result-button"><img alt='download' src={Download} />&nbsp;บันทึกผลการทดสอบ
                </Button>
                <Button
                  onClick={() => { history.push("/teacher/dashboard") }}
                  variant="contained"
                  size="large"
                  className="back-button"><img alt='back' src={Back} />&nbsp;กลับสู่ Dashboard
                </Button>
              </div>
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
