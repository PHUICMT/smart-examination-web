import "./EnterPin.scss";

import React from 'react';
import InfoCard from "../../components/info-card/info-card"

const EnterPin = () => {


    return (
        <React.Fragment>

            <InfoCard
                title="เลือกกลุ่มผู้เข้าใช้ระบบ"
                description="โปรดเลือกประเภทสำหรับเข้าใช้ระบบจากปุ่มด้านล่าง"
                icon={null}
                marginTop={100}
            />

            <div className="enter-pin">

            </div>

        </React.Fragment>
    );
};

export default EnterPin;