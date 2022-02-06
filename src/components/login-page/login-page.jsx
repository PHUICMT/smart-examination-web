import "./login-page.scss";

import studentIcon from '../../assets/icons/student-icon.svg'
import AccountCircle from '@mui/icons-material/AccountCircle';

import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


const LoginPage = (props) => {
    return (
        <React.Fragment>
            <div className="login-page">
                <div className="student">
                    <Avatar
                        src={studentIcon}
                        sx={{ width: 100, height: 100 }}
                    />
                    <p>นักศึกษา</p>
                </div>
                <TextField
                    id="input-with-icon-textfield"
                    label="TextField"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </div>
        </React.Fragment>
    );
};

export default LoginPage;