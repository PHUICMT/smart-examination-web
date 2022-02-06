import "./custom-button.scss";
import Button from '@mui/material/Button';

const CustomButton = (props) => {
    return (
        <div className="custom-button">
            <Button variant="outlined">
                {props.message}
            </Button>
        </div>
    );
};

export default CustomButton;