import "./exam-item.scss";

import React, { useEffect } from "react";
import InfoCard from "../../components/info-card/info-card";
import { Checkbox, FormGroup, Button } from "@mui/material/";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
} from "@material-ui/core";
import { PropaneRounded } from "@mui/icons-material";

export function CheckBoxExam(props) {
  const title = props.title;
  const items = props.items;

  let result = [];
  for (let i = 0; i < items.length; i++) {
    result.push(false);
  }

  const handleChange = (event) => {
    const index = event.target.id;
    result[index] = event.target.checked;
    props.onValueChange(result);
  };

  return (
    <InfoCard
      className="exam-card"
      title={title}
      description={null}
      icon={null}
      marginTop={100}
      input={
        <div>
          <FormGroup>
            {items.map((data, index) => {
              return (
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} id={`${index}`} />}
                  label={data}
                  key={index}
                />
              );
            })}
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
    console.log("call handleChange");
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
              onChange={props.onChangeResult}
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
