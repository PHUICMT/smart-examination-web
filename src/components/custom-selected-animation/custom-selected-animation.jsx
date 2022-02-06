import "./custom-selected-animation.scss";

import studentIcon from '../../assets/icons/student-icon.svg'
import teacherIcon from '../../assets/icons/teacher-icon.svg'
import LoginIcon from '@mui/icons-material/Login';

import Button from '@mui/material/Button';
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const CustomSelectionAnimation = (props) => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {
            icon: studentIcon,
        },
        {
            icon: teacherIcon,
        }
    ];

    return (
        <Box
            sx={{
                width: 900,
                position: 'relative',
                display: 'inline-block',
            }}

            className="custom-selected-animation"
        >
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    className={value === 0 ? "Mui-selected-1" : "Mui-selected-2"}
                >
                    {console.log(value)}
                    <Tab label="นักศึกษา" />
                    <Tab label="อาจารย์" />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>

                </TabPanel>
            </SwipeableViews>

            {fabs.map((fab, index) => (
                <Zoom
                    in={value === index}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit={true}
                >
                    <div className="button-login">
                        <Button variant="contained" endIcon={<LoginIcon />}>
                            ลงชื่อเข้าใช้
                        </Button>
                        <img src={fab.icon} />
                    </div>

                </Zoom>
            ))}
        </Box>
    );
};

export default CustomSelectionAnimation;