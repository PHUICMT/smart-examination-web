import "./header.scss";
import examLogo from '../../assets/image/exam-logo512.png'
import studentIcon from "../../assets/icons/student-icon.svg";
import teacherIcon from "../../assets/icons/teacher-icon.svg";

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';

const MenuHeader = (props) => {

    const logout = () => {
        window.sessionStorage.clear();
        console.log("logout");
        props.history.push({
            pathname: "/",
            state: { data: null },
        });
    };

    return (
        <Menu
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            className="menu-header"
        >
            <MenuItem disabled>
                <p>สวัสดีคุณ {props.name}</p>
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}

const Header = () => {
    const history = useHistory();
    const location = useLocation();

    const [userId, setUserId] = useState(null);
    const [isStudent, setIsStudent] = useState(null);
    const [name, setName] = useState(null);
    const [icons, setIcon] = useState(null);

    useEffect(() => {
        let sessionUserId = window.sessionStorage.getItem("userId");
        let sessionName = window.sessionStorage.getItem("name");
        let sessionIsStudent = window.sessionStorage.getItem("isStudent");

        if (sessionUserId !== null && sessionName !== null && sessionIsStudent !== null) {
            setUserId(sessionUserId);
            setName(sessionName);
            setIsStudent(sessionIsStudent);

            if (sessionIsStudent === "true") {
                setIcon(studentIcon);
            } else {
                setIcon(teacherIcon);
            }
        }
    }, [location, userId, isStudent, name]);

    const gotoIndex = () => {
        history.push("/");
    };

    const AvatarUser = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        if (userId !== null) {
            return (
                <>
                    <div className="profile" onClick={handleClick}>
                        <Avatar src={icons} sx={{ width: 50, height: 50 }} />
                    </div>
                    <MenuHeader
                        anchorEl={anchorEl}
                        open={open}
                        handleClose={handleClose}
                        name={name}
                        userId={userId}
                        isStudent={isStudent}
                        history={history} />
                </>)
        } else {
            return (<div></div>)
        }
    }

    if (window.sessionStorage.getItem("userId") !== null) {
        return (
            <header className="header header-content">
                <div className="logo-title" onClick={gotoIndex}>
                    <p className="header-title"> CPSU Smart Examination </p>
                    <img src={examLogo} className="logo" alt="logo" />
                </div>
                <HomeIcon sx={{ width: 50, height: 50, color: '#FFFF' }} className="focusable" onClick={gotoIndex} />
                <AvatarUser />
            </header>
        );
    } else {
        return (
            <header className="header header-content">
                <div className="logo-title" onClick={gotoIndex}>
                    <p className="header-title"> CPSU Smart Examination </p>
                    <img src={examLogo} className="logo" alt="logo" />
                </div>
                <HomeIcon sx={{ width: 50, height: 50, color: '#FFFF' }} className="focusable" onClick={gotoIndex} />
                <></>
            </header>
        );
    };
};

export default Header;