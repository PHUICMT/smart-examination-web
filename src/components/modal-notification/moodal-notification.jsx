import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import "./moodal-notification.scss";


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

  return ReactDOM.createPortal(
    <CSSTransition
      className="modal-notification modal-content"
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      onClick={props.onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="modal-detail">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>

        <div className="modal-footer">
          <Button variant="contained" color="error" onClick={props.onClose} className="button-cancel" endIcon={<CancelIcon />}>
            ยกเลิก
          </Button>
          <Button variant="contained" color="success" onClick={props.onConfirm} className="button-submit" endIcon={<CheckCircleIcon />}>
            ยืนยัน
          </Button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
