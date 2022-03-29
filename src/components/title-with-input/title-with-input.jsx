import InputText from "../../components/input-text/input-text";
import { Grid, Typography } from "@mui/material";

const TitleWithInput = (props) => {
  //style
  const titleStyled = {
    width: 200,
    height: 60,
    borderRadius: 5,
    fontSize: 24,
    alignItems: "center",
    display: "flex",
    paddingLeft: 4,
    color: props.blackTitle ? "#000" : "#fff",
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "1px" }}>
      <Grid item xs={2}>
        <Typography sx={titleStyled}>{props.title}</Typography>
      </Grid>
      <Grid item container xs={10}>
        <InputText
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
        />
      </Grid>
    </Grid>
  );
};

export default TitleWithInput;
