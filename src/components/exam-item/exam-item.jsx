import "./exam-item.scss";
import InfoCard from "../../components/info-card/info-card";
import {
  Checkbox,
  FormGroup,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@mui/material/";

export function CheckBoxExam(props) {
  const title = props.title;
  const items = props.items;

  let result = [];
  for (let i = 0; i < items.length; i++) {
    result.push(false);
  }

  const handleChange = (event) => {
    let result = event.target.id;
    if (!props.question) {
      props.onValueChange(result);
    } else {
      props.onChangeResult(event);
    }
  };

  return (
    <InfoCard
      className="exam-card"
      title={title}
      onChange={props.onValueChangeQuestion}
      question={props.question}
      description={null}
      icon={null}
      marginTop={100}
      input={
        <div>
          <FormGroup>
            {items.map((data, index) => {
              return (
                <FormControlLabel
                  control={
                    props.value !== undefined ? (
                      <Checkbox
                        onChange={handleChange}
                        id={`${index}`}
                        checked={
                          props.value[index] !== undefined
                            ? props.value[index]
                            : false
                        }
                      />
                    ) : (
                      <Checkbox onChange={handleChange} id={`${index}`} />
                    )
                  }
                  label={data}
                  key={index}
                />
              );
            })}
            {props.question ? (
              <div>
                <FormControlLabel
                  checked={false}
                  label={""}
                  control={<Checkbox />}
                />
                <input
                  style={{ width: `${props.style + "ch"}` }}
                  className="input-addItem"
                  type="text"
                  value={props.valueCheckBox}
                  onChange={props.onChangeTextAddCheckBox}
                />
                <Button
                  sx={{
                    height: "50px",
                    width: "150px",
                    marginTop: "20px",
                    backgroundColor: "#fff !important",
                    border: "50%",
                  }}
                  onClick={props.onClickAddCheckBox}
                >
                  เพิ่ม
                </Button>
              </div>
            ) : null}
          </FormGroup>
        </div>
      }
    />
  );
}

export function RadioBoxExam(props) {
  const title = props.title;
  const items = props.items;

  const handleChange = (event) => {
    let result = event.target.value;
    if (!props.question) {
      props.onValueChange(result);
    } else {
      props.onChangeResult(event);
    }
  };

  return (
    <InfoCard
      className="exam-card"
      title={title}
      onChange={props.onValueChangeQuestion}
      value={props.value}
      question={props.question}
      description={null}
      icon={null}
      marginTop={100}
      input={
        <FormControl className="radio-group">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={props.value}
          >
            {items.map((data, index) => {
              return (
                <FormControlLabel
                  value={`${index}`}
                  control={<Radio />}
                  label={data}
                  key={index}
                  onChange={handleChange}
                />
              );
            })}
          </RadioGroup>
          {props.question ? (
            <div>
              <FormControlLabel
                checked={false}
                label={""}
                control={<Radio />}
              />
              <input
                style={{ width: `${props.style}ch` }}
                className="input-addItem"
                type="text"
                placeholder="add item"
                value={props.valueRadio}
                onChange={props.onChangeTextAddRadio}
              />
              <Button
                sx={{
                  height: "50px",
                  width: "150px",
                  marginTop: "20px",
                  backgroundColor: "#fff !important",
                  border: "50%",
                }}
                onClick={props.onClickAddRadio}
              >
                เพิ่ม
              </Button>
            </div>
          ) : null}
        </FormControl>
      }
    />
  );
}

export function TextFieldExam(props) {
  const title = props.title;

  return (
    <InfoCard
      className="exam-card"
      title={title}
      onChange={props.onValueChangeQuestion}
      value={props.value}
      question={props.question}
      description={
        <form>
          <div className="form-group">
            <textarea
              className="textarea has-fixed-size"
              placeholder="เขียนคำตอบ"
              onChange={props.onValueChange}
            ></textarea>
          </div>
        </form>
      }
      icon={null}
      marginTop={100}
      input={null}
    />
  );
}
