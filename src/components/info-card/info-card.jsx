import "./info-card.scss";

import { Container } from 'react-bulma-components';

const AcceptCard = (props) => {
    return (
        <Container>
            <div className="info-card">
                <div className="info-card-text">
                    <div className="info-card-text title-1">{props.title}</div>
                    <div className="info-card-text title-2">{props.description}</div>
                </div>
                <img src={props.icon} className="info-card-icon" />
            </div>
        </Container>
    );
};

export default AcceptCard;