import { Grid, Typography } from "@mui/material";

const TabBar = (props) => {
  //style
  const tabStyled = {
    width: "200px !important",
    height: "60px !important",
    borderRadius: 5,
    fontSize: "28px !important",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    cursor: "pointer",
    backgroundColor: props.tab === props.CreateExam ? "#fff" : "transparent",
    color: props.tab === props.CreateExam ? "#000" : "#fff",
  };

  return (
    <Grid
      item
      xs={3}
      alignItems="center"
      justifyContent="center"
      onClick={props.onClick}
    >
      <Typography component={"span"} sx={tabStyled}>
        {props.title}
      </Typography>
    </Grid>
  );
};

export default TabBar;
