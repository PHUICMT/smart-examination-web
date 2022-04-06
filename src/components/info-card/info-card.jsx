import "./info-card.scss";

import { Container } from "react-bulma-components";
import TitleWithInput from "../../components/title-with-input/title-with-input";

const InfoCard = (props) => {
  let marginTop = props.marginTop;
  let title = props.title;
  let description = props.description;
  let input = props.input;

  return (
    <Container
      id={props.id}
    >
      <div className="info-card" style={{ marginTop: `${marginTop}px` }}>
        <div className="info-card-text">
          {!props.question ? (
            // title !== null || description !== null || input !== null ? (
            <div>
              <div className="info-card-text title-1">{title}</div>
              <div className="info-card-text title-2">{description}</div>
              <div className="info-card-text title-3">{input}</div>
            </div>
          ) : // ) : null
            title !== null ? (
              <div>
                <TitleWithInput
                  blackTitle={true}
                  title={title}
                  onChange={props.onChange}
                  value={props.valueTi}
                />
                <div className="info-card-text title-2">{description}</div>
                <div className="info-card-text title-3">{input}</div>
              </div>
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
