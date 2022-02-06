
import silpakornIcon from '../../assets/icons/silpakorn-icon.svg'
import React from 'react';

import HeaderWithIcon from "../../components/header-with-icon/header-with-icon"


const DashBoard = () => {
    return (
        <React.Fragment>
            <HeaderWithIcon
                title="ยินดีต้อนรับ"
                description="มาเริ่มสร้างข้อสอบกันเลย"
                icon={null}
            />
            
        </React.Fragment>
    );
};

export default DashBoard;