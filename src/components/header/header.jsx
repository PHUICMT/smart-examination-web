import "./header.scss";
import examLogo from '../../assets/image/exam-logo512.png'
import studentIcon from "../../assets/icons/student-icon.svg";
import teacherIcon from "../../assets/icons/teacher-icon.svg";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const Header = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // let icons = props.isStudent ? studentIcon : teacherIcon;
    let icons = true ? studentIcon : teacherIcon;
    return (
        <header className="header header-content">
            <div className="logo-title" onClick={() => {
                history.push({
                    pathname: "/index",
                    state: { data: null },
                });
            }}>
                <p className="header-title"> CPSU Smart Examination </p>
                <img src={examLogo} className="logo" alt="logo" />
            </div>
            <div className="profile" onClick={handleClick}>
                {/* <p>สวัสดี : 07610497</p> */}
                <Avatar src={icons} sx={{ width: 50, height: 50 }} />
            </div>
            <MenuHeader
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
            />
        </header>
    );
};

const MenuHeader = (props) => {
    return (
        <Menu
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            className="menu-header"
        >
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}

export default Header;