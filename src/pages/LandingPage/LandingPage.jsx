import "./LandingPage.scss";

import silpakornIcon from '../../assets/icons/silpakorn-icon.svg'
import maintenanceIcon from '../../assets/icons/process-01.svg'

import React from 'react';

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon"
import InfoCard from "../../components/info-card/info-card"
import CustomSelectionAnimation from "../../components/custom-selected-animation/custom-selected-animation"

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
            <CustomSelectionAnimation message="นักศึกษา" />
        </React.Fragment>
    );
};

export default MainPage;