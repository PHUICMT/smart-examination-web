import "./EnterPin.scss";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import InfoCard from "../../components/info-card/info-card";
import { LoadingPopup } from "../../components/loading-popup/loading-popup"
import { handleOnGetExam, handleOnGetResult } from "../../services/get-exam-item"
import Button from '@mui/material/Button';

const EnterPin = (props) => {
  const history = useHistory();
  const [examPin, setExamPin] = useState("");
  const [isStudent, setStudent] = useState(true);
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.isStudent !== undefined) {
      setStudent(props.isStudent)
      if (props.isStudent) {
        setClassName("student")
      }
      else {
        setClassName("teacher")
      }
    }
    if (props.title !== undefined) {
      setTitle(props.title)
    }
  }, [props.isStudent, props.title]);


  async function handleOnConfirm() {
    setLoading(true);
    if (isStudent) {
      handleOnGetExam(examPin).then(res => {
        if (res.exam_items !== false && res.exam_items !== undefined) {
          setLoading(false);
          history.push("/student/exampage",
            {
              examPin: examPin,
              data: res.exam_items
            });
        }
      });
    } else {
      handleOnGetResult(examPin).then(res => {
        if (res.result !== undefined) {
          setLoading(false);
          history.push("/teacher/result-page",
            {
              examPin: examPin,
              data: res.result
            });
        }
      });
    }
  }


  return (
    <React.Fragment>
      <LoadingPopup open={loading} />
      <div className="title">
        <h1>{title}</h1>
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
                    className={`submit-exam ${className}`}
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
