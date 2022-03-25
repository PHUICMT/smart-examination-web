import "./info-card.scss";

import { Container } from "react-bulma-components";

const InfoCard = (props) => {
  let marginTop = props.marginTop;
  let title = props.title;
  let description = props.description;
  let input = props.input;

  return (
    <Container>
      <div className="info-card" style={{ marginTop: `${marginTop}px` }}>
        <div className="info-card-text">
          {title !== null ? (
            <div className="info-card-text title-1">{title}</div>
          ) : null}
          {description !== null ? (
            <div className="info-card-text title-2">{description}</div>
          ) : null}
          {input !== null ? (
            <div className="info-card-text title-3">{input}</div>
          ) : null}
        </div>

        {props.icon !== null ? (
          <img alt="icon info" src={props.icon} className="info-card-icon" />
        ) : null}
      </div>
    </Container>
  );
};

export default InfoCard;
