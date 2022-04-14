import "./login-page.scss";

import studentIcon from "../../assets/icons/student-icon.svg";
import teacherIcon from "../../assets/icons/teacher-icon.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";

import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { LoadingPopup } from "../../components/loading-popup/loading-popup"
import { login } from "../../services/login";

const InputField = (props) => {
  let color = props.isStudent ? "#009182" : "#64FF";

  function handleOnValueChange(e) {
    return props.onValueChange(e.target.value);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        "& .MuiTextField-root": { width: "15ch" },
        "& .MuiInput-underline:after": { borderBottomColor: color },
        "& .MuiInput-underline:before": { borderBottomColor: "#ffff" },
        "& label.Mui-focused": { color: color },
      }}
    >
      {props.isUserId ? <AccountCircle /> : <LockIcon />}
      <TextField
        error={props.loginFail}
        onChange={(e) => handleOnValueChange(e)}
        label={props.label}
        variant="standard"
        fullWidth
        helperText={props.loginFail ? "รหัสประจำตัวหรือรหัสผ่านไม่ถูกต้อง" : ""}
      />
    </Box>
  );
};

const LoginPage = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);
  let history = useHistory();

  let fieldName = props.isStudent ? "นักศึกษา" : "อาจารย์";
  let className = props.isStudent ? "student" : "teacher";
  let pathName = props.isStudent ? "/student/enter-pin" : "/teacher/dashboard";
  let icons = props.isStudent ? studentIcon : teacherIcon;
  let userId = ""

  function handleLogin() {
    setLoading(true);
    login(userId).then(res => {
      if (res !== undefined && res !== false) {
        window.sessionStorage.setItem("userId", res.userId);
        window.sessionStorage.setItem("name", res.name);
        window.sessionStorage.setItem("isStudent", res.isStudent);
        setLoading(false);
        history.push(pathName);
      } else {
        setLoginFail(true);
        setLoading(false);
      }
    });
  }

  function handleUserIdChange(value) {
    if (value !== undefined) {
      userId = value;
      setLoginFail(false);
    }
  }

  return (
    <React.Fragment>
      <LoadingPopup open={loading} />
      <div className="login-page">
        <div className={className}>
          <Avatar src={icons} sx={{ width: 100, height: 100 }} />
          <p className="login-title">{fieldName}</p>
          <InputField
            isStudent={props.isStudent}
            label="รหัสประจำตัว"
            onValueChange={(value) => handleUserIdChange(value)}
            isUserId={true}
            loginFail={loginFail}
          />
          <InputField
            isStudent={props.isStudent}
            label="รหัสผ่าน"
            onValueChange={(value) => (value)}
            isUserId={false}
            loginFail={loginFail}
          />
          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={() => handleLogin()}
          >
            <p>ลงชื่อเข้าใช้</p>
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
