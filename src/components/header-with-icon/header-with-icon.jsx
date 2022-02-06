import "./header-with-icon.scss";

import React from 'react';
import { Container } from 'react-bulma-components';

const HeaderWithIcon = (props) => {
    console.log(props.icon)
    return (
        <React.Fragment>
            <Container>
                <div className="header-with-icon">
                {props.icon != null ?<img src={props.icon} className="header-icon" /> : null}
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