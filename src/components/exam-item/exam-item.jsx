import "./exam-item.scss";

import React from "react";
import InfoCard from "../../components/info-card/info-card";
import { Checkbox, FormGroup } from "@mui/material/";
import {
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
} from "@material-ui/core";

export function CheckBoxExam(props) {

    const title = props.title
    const items = props.items
    return (
        < InfoCard
            className="exam-card"
            title={title}
            description={null}
            icon={null}
            marginTop={100}
            input={
                < div div >
                    <FormGroup>
                        {
                            items.map((data, _) => {
                                return (
                                    <FormControlLabel control={<Checkbox />} label={data} />
                                )
                            })
                        }
                    </FormGroup>
                </div >
            }
        />
    )
}

export function RadioBoxExam(props) {

    const title = props.title
    const items = props.items
    return (
        < InfoCard
            className="exam-card"
            title={title}
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
                                    control={< Radio />}
                                    label={data}
                                />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            }
        />
    )
}

export function TextFieldExam(props) {

    const title = props.title
    return (
        <InfoCard
            className="exam-card"
            title={title}
            description={
                <form>
                    <div className="form-group">
                        <textarea
                            className="textarea has-fixed-size"
                            placeholder="เขียนคำตอบ"
                        ></textarea>
                    </div>
                </form>
            }
            icon={null}
            marginTop={100}
            input={null}
        />
    )
}
