import "./login-page.scss";

import studentIcon from '../../assets/icons/student-icon.svg'
import teacherIcon from '../../assets/icons/teacher-icon.svg'
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';

import React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const InputField = (props) => {

    let color = props.isStudent ? '#009182' : '#64FF'

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            '& .MuiTextField-root': { width: '15ch', },
            '& .MuiInput-underline:after': { borderBottomColor: color, },
            '& .MuiInput-underline:before': { borderBottomColor: '#ffff', },
            '& label.Mui-focused': { color: color, },
        }}
        >
            {
                props.isUserId ? <AccountCircle /> : <LockIcon />
            }
            <TextField
                label={props.label}
                variant="standard"
                fullWidth
            />
        </Box>
    )
}

const LoginPage = (props) => {
    let history = useHistory()

    let fieldName = props.isStudent ? "นักศึกษา" : "อาจารย์"
    let className = props.isStudent ? "student" : "teacher"
    let pathName = props.isStudent ? '/student/enter-pin' : '/teacher/dashboard'
    let icons = props.isStudent ? studentIcon : teacherIcon
    let data = props.data

    return (
        <React.Fragment>
            <div className="login-page">
                <div className={className}>
                    <Avatar
                        src={icons}
                        sx={{ width: 100, height: 100 }}
                    />
                    <p>{fieldName}</p>
                    <InputField isStudent={props.isStudent} label="รหัสประจำตัว" isUserId={true} />
                    <InputField isStudent={props.isStudent} label="รหัสผ่าน" isUserId={false} />
                    <Button
                        variant="contained"
                        endIcon={<LoginIcon />}
                        onClick={() => history.push(pathName)}
                    >
                        <p>ลงชื่อเข้าใช้</p>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;