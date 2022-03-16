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
          <div className="info-card-text title-1">{title}</div>
          {description !== null ? (
            <div className="info-card-text title-2">{description}</div>
          ) : null}
          {input !== null ? (
            <div className="info-card-text title-3">{input}</div>
          ) : null}
        </div>
        <img alt="icon info" src={props.icon} className="info-card-icon" />
      </div>
    </Container>
  );
};

export default InfoCard;
