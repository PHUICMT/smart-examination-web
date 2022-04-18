import './button-with-icon.scss';

function ButtonWithIcon(props) {
    return <button {...props} className="button button__with-icon" style={{backgroundImage: `url('${props.icon}')`}}>{props.children}</button>
}

export default ButtonWithIcon