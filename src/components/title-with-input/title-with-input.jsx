import InputText from "../../components/input-text/input-text";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";

const TitleWithInput = (props) => {

  const [value, setValue] = useState("");
  //style
  const titleStyled = {
    width: 200,
    height: 60,
    borderRadius: 5,
    fontSize: 24,
    alignItems: "center",
    display: "flex",
    paddingLeft: 4,
    color: (props.blackTitle || false) ? "#000" : "#fff",
  };

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e);
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "1px" }}>
      <Grid item xs={2}>
        <Typography component={'span'} sx={titleStyled}>{props.title || ""}</Typography>
      </Grid>
      <Grid item container xs={10}>
        <InputText
          onChange={handleChange}
          value={props.value || value}
          disabled={props.disabled || false}
        />
      </Grid>
    </Grid>
  );
};

export default TitleWithInput;
