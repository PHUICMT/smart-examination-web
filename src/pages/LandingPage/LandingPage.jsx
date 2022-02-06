import "./LandingPage.scss";

import silpakornIcon from '../../assets/icons/silpakorn-icon.svg'
import maintenanceIcon from '../../assets/icons/process-01.svg'
import studentIcon from '../../assets/icons/student-icon.svg'
import teacherIcon from '../../assets/icons/teacher-icon.svg'

import React from 'react';

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon"
import InfoCard from "../../components/info-card/info-card"
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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
        </React.Fragment>
    );
};

export default MainPage;