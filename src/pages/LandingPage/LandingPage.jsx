import "./LandingPage.scss";

import silpakornIcon from '../../assets/icons/silpakorn-icon.svg'
import maintenanceIcon from '../../assets/icons/process-01.svg'
import studentIcon from '../../assets/icons/student-icon.svg'
import teacherIcon from '../../assets/icons/teacher-icon.svg'


import HeaderWithIcon from "../../components/header-with-icon/header-with-icon"
import InfoCard from "../../components/info-card/info-card"
import LoginPage from "../../components/login-page/login-page"

import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from 'react-spring';
import { useHistory } from "react-router-dom";


const LandingPage = () => {
    const history = useHistory();

    const [userId, setUserId] = useState(null);
    const [isStudent, setIsStudent] = useState(null);

    const [openLogin, setOpenLogin] = useState(false);
    const [loginAsStudent, setLoginAsStudent] = useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const [headerTitleCard, setHeaderTitleCard] = useState("เลือกกลุ่มผู้เข้าใช้ระบบ");
    const [headerDescriptionCard, setHeaderDescriptionCard] = useState("โปรดเลือกประเภทสำหรับเข้าใช้ระบบจากปุ่มด้านล่าง");

    useEffect(() => {
        let sessionUserId = window.sessionStorage.getItem("userId");
        let sessionName = window.sessionStorage.getItem("name");
        let sessionIsStudent = window.sessionStorage.getItem("isStudent");

        if (sessionUserId !== null && sessionName !== null && sessionIsStudent !== null) {
            setUserId(sessionUserId);
            setIsStudent(sessionIsStudent);

            let title = "สวัสดีคุณ " + sessionName;
            setHeaderTitleCard(title);

            let description = "คุณเป็นผู้ใช้งานระบบสำหรับ " + (sessionIsStudent === "true" ? "นักเรียน" : "ครู") + " โปรดเลือกเมนูการทำงานต่อไป";
            setHeaderDescriptionCard(description);
        }
    }, [userId, isStudent]);



    const Fade = React.forwardRef(function Fade(props, ref) {
        const { in: open, children, onEnter, onExited, ...other } = props;
        const style = useSpring({
            from: { opacity: 0 },
            to: { opacity: open ? 1 : 0 },
            onStart: () => {
                if (open && onEnter) {
                    onEnter();
                }
            },
            onRest: () => {
                if (!open && onExited) {
                    onExited();
                }
            },
        });

        return (
            <animated.div ref={ref} style={style} {...other}>
                {children}
            </animated.div>
        );
    });

    Fade.propTypes = {
        children: PropTypes.element,
        in: PropTypes.bool.isRequired,
        onEnter: PropTypes.func,
        onExited: PropTypes.func,
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 550,
        p: 4,
    };

    const ShowLoginModal = () => {
        return (<div id="modal-container-layout">
            <Modal
                className="modal-container"
                open={openLogin}
                onClose={handleCloseLogin}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                id="login-modal-modal-id"
            >
                <Fade in={openLogin}>
                    <Box sx={style}>
                        <LoginPage isStudent={loginAsStudent} />
                    </Box>
                </Fade>
            </Modal>
        </div>)
    }

    const ButtonGroupLogin = () => {
        return (<div className="button-group">
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    className="student"
                    onClick={() => {
                        setLoginAsStudent(true)
                        handleOpenLogin()
                    }}
                >
                    <p>นักศึกษา</p>
                    <img alt="studentIcon" src={studentIcon}></img>
                </Button>
                <Button
                    variant="contained"
                    className="teacher"
                    onClick={() => {
                        setLoginAsStudent(false)
                        handleOpenLogin()
                    }}
                >
                    <p>อาจารย์</p>
                    <img alt="teacherIcon" src={teacherIcon}></img>
                </Button>
            </Stack>
        </div>)
    }

    const ButtonGroupStudent = () => {
        const gotoStudentExamPin = () => {
            history.push("/student/enter-pin")
        }

        return (
            <div className="button-group-student">
                <Button
                    variant="contained"
                    onClick={gotoStudentExamPin}
                >
                    <p>เลือกแบบทดสอบ</p>
                    <img alt="studentIcon" src={studentIcon}></img>
                </Button>
            </div>
        )
    }

    const ButtonGroupTeacher = () => {
        const gotoTeacherDashBoard = () => {
            history.push("/teacher/dashboard")
        }

        return (
            <div className="button-group-teacher">
                <Button
                    variant="contained"
                    onClick={gotoTeacherDashBoard}
                >
                    <p>เข้าสู่หน้า Dashboard</p>
                    <img alt="teacherIcon" src={teacherIcon}></img>
                </Button>
            </div>
        )
    }
    return (
        <React.Fragment>
            <HeaderWithIcon
                title="แบบทดสอบ"
                description="อัจฉริยะ"
                icon={silpakornIcon}
            />
            <InfoCard
                title={headerTitleCard}
                description={headerDescriptionCard}
                icon={maintenanceIcon}
            />
            {isStudent !== null ?
                isStudent === "true" ?
                    <ButtonGroupStudent />
                    :
                    <ButtonGroupTeacher />
                :
                <>
                    <ShowLoginModal />
                    <ButtonGroupLogin />
                </>
            }
        </React.Fragment>
    );
};

export default LandingPage;