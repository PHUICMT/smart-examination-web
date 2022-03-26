import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./moodal-notification.scss";
import axios from "axios";


const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  async function handleOnSendExamResult(data) { //For student on finish exam
    const json = JSON.stringify({
      examPin: data.examPin,
      examItems: data.examItems,
      studentId: data.studentId,
      startAndEndTime: data.startAndEndTime,
      examItemsTimeStamp: data.examItemsTimeStamp,
      clickTimeStamp: data.clickTimeStamp,
      hoverTime: data.hoverTime,
    });
    return await axios
      .post("/save-result", json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function () {
        //TODO do when post api success
        // history.push("/index"); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleOnSaveExamCreated(data) { // For teacher on create exam
    const json = JSON.stringify({
      examPin: data.examPin,
      examItems: data.examItems,
      teacherId: data.teacherId
    });
    return await axios
      .post("/save-exam", json, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function () {
        //TODO do when post api success
        // history.push("/index"); 
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return ReactDOM.createPortal(
    <CSSTransition
      className="modal modal-content"
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      onClick={props.onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button button-cancel">
            ยกเลิก
          </button>
          <button onClick={props.onClose} className="button button-submit">
            ยืนยัน
          </button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
