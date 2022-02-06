import "./header-with-icon.scss";

import React from 'react';
import { Container } from 'react-bulma-components';

const HeaderWithIcon = (props) => {
    return (
        <React.Fragment>
            <Container>
                <div className="header-with-icon">
                    <img src={props.icon} className="header-icon" />
                    <div className="title-box">
                        <h className="title-1">{props.title}</h>
                        <h className="title-2">{props.description}</h>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default HeaderWithIcon;