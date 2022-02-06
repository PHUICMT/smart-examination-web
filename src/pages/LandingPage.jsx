import silpakornIcon from '../assets/icons/silpakorn-icon.svg'
import maintenanceIcon from '../assets/icons/process-01.svg'

import React from 'react';
import HeaderWithIcon from "../components/header-with-icon/header-with-icon"
import InfoCard from "../components/info-card/info-card"

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
                description="โปรดเลือกประเภทสำหรับเข้าใช้ระบบ"
                icon={maintenanceIcon}
            />
        </React.Fragment>
    );
};

export default MainPage;