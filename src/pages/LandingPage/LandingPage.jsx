import "./LandingPage.scss";

import silpakornIcon from '../../assets/icons/silpakorn-icon.svg'
import maintenanceIcon from '../../assets/icons/process-01.svg'
import studentIcon from '../../assets/icons/student-icon.svg'
import teacherIcon from '../../assets/icons/teacher-icon.svg'

import React from 'react';

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon"
import InfoCard from "../../components/info-card/info-card"
import LoginPage from "../../components/login-page/login-page"

import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from 'react-spring';

const ModalObject = (userType) => {
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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                className="modal-container"
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <LoginPage />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const MainPage = () => {
    return (
        <React.Fragment>
            <HeaderWithIcon
                title="แบบทดสอบ"
                description="อัจฉริยะ (ชื่อเฉพาะกิจ)"
                icon={silpakornIcon}
            />
            <InfoCard
                title="เลือกกลุ่มผู้เข้าใช้ระบบ"
                description="โปรดเลือกประเภทสำหรับเข้าใช้ระบบจากปุ่มด้านล่าง"
                icon={maintenanceIcon}
            />
            <div className="button-group">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" className="student">
                        <p>นักศึกษา</p>
                        <img src={studentIcon}></img>
                    </Button>
                    <Button variant="contained" className="teacher">
                        <p>อาจารย์</p>
                        <img src={teacherIcon}></img>
                    </Button>
                </Stack>
            </div>
            {ModalObject()}
        </React.Fragment>
    );
};

export default MainPage;