import "./header-with-icon.scss";

import React from "react";
import { Container } from "react-bulma-components";

const HeaderWithIcon = (props) => {
  return (
    <React.Fragment>
      <Container>
        <div className="header-with-icon">
          {props.icon != null ? (
            <img src={props.icon} className="header-icon" />
          ) : null}
          <div className="title-box">
            <h1 className="title-1">{props.title}</h1>
            <h1 className="title-2">{props.description}</h1>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HeaderWithIcon;
