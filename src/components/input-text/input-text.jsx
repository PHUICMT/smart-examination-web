import { OutlinedInput, FormControl } from "@mui/material";
const InputText = (props) => {
  //style
  const titleTextFieldStyled = {
    width: "100%",
    fontSize: "20px",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontWeight: "400",
    lineHeight: "1.0",
    color: "#000000",
    background: props.disabled ? "#e1e1e1" : "#ffffff",
    border: "none",
    borderRadius: "10px",
    alignItems: "center",
  };

  return (
    <FormControl variant="outlined" focus="false">
      <OutlinedInput
        sx={titleTextFieldStyled}
        type="text"
        disabled={props.disabled}
        value={props.value}
        onChange={props.onChange}
      />
    </FormControl>
  );
};

export default InputText;
