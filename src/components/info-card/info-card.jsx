import "./info-card.scss";

import { Container } from 'react-bulma-components';

const InfoCard = (props) => {

    let marginTop = props.marginTop
    let title = props.title
    let description = props.description
    return (
        <Container>
            <div className="info-card" style={{ marginTop: `${marginTop}px` }}>
                <div className="info-card-text">
                    <div className="info-card-text title-1">{title}</div>
                    <div className="info-card-text title-2">{description}</div>
                </div>
                <img src={props.icon} className="info-card-icon" />
            </div>
        </Container>
    );
};

export default InfoCard;