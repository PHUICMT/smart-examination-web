import "./phq-9-test.scss";
import IndexBox from '../../assets/icons/index-box.svg'
import Send from '../../assets/icons/send.svg'

import Result from '../result/result'
import PHQTitleCard from '../../components/phq-9-title-card/phq-9-title-card'
import { LoadingPopup } from "../../components/loading-popup/loading-popup"
import { QuestionnaireSenderService, ResultAnswerSenderService } from "../../services/message-sender-service";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Container } from 'react-bulma-components';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import update from 'react-addons-update';
import { v4 as uuidv4 } from 'uuid';
import $ from "jquery";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';

let questionnaire_uuid = null

let clickTime = [null, null, null, null, null, null, null, null, null];
let scopeTime = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let fontEndTimeStamp = [[], [], [], [], [], [], [], [], []];
let startHover = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let timeStamp = [[], [], [], [], [], [], [], [], []];
let changedTimeStamp = [[], [], [], [], [], [], [], [], []];
let behavior = ['', '', '', '', '', '', '', '', ''];
let start_end_time = [-1, -1];

let isChecked = [false, false, false, false, false, false, false, false, false];
let emailFiled = false;

function getCurrentTime() {
    var now = Math.round((new Date()).getTime());
    return now;
}
const PHQTestComponent = () => {

    const location = useLocation();
    const [totalValues, setTotalValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [isResultSubmit, setIsResultSubmit] = useState(false);
    const [totalScore, setTotalScore] = useState();

    const allowsRecord = useState(location.state)[0];

    const [isScreenRecord, setIsScreenRecord] = useState(false);
    const [isVideoRecord, setIsVideoRecord] = useState(false);
    const [streamWebcam, setStreamWebcam] = useState(null);
    const [streamScreen, setStreamScreen] = useState(null);

    const [email, setEmail] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        questionnaire_uuid = uuidv4();
        try {
            QuestionnaireSenderService(questionnaire_uuid);
        } catch (e) {
            console.error(e)
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const VideoSenderService = function (blob, recordType, uuid) {
        setIsLoading(true);
        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                // console.log("Server returned: ", e.target.responseText);
            }
        };
        var video = new FormData();
        video.append("uuid", questionnaire_uuid);
        video.append("blob", blob);

        return $.ajax({
            type: "POST",
            url: `/upload-recorded-${recordType}`,
            data: video,
            processData: false,
            contentType: false,
        }).done(function () {
            if (recordType.includes("webcam")) {
                setIsLoading(false);
            }
        }).catch(function (e) {
            console.log(e);
            setIsLoading(false);
        });
    };

    function stopRecord() {
        if (allowsRecord['screenToggleAllows']) {
            streamScreen.getTracks().forEach((track) => track.stop());
        }
        if (allowsRecord['webcamToggleAllows']) {
            streamWebcam.getTracks().forEach((track) => track.stop());
        }
    }

    function handleRecord({ stream, mimeType }, recordType, uuid) {
        let recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };
        mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, {
                type: mimeType,
            });
            recordedChunks = [];
            return VideoSenderService(blob, recordType, uuid);
        };
        mediaRecorder.start(200);
    }

    async function recordVideo(uuid) {
        const mimeType = "video/webm";
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        setStreamWebcam(stream);
        handleRecord({ stream, mimeType }, "webcam", uuid);
    }

    async function recordScreen(uuid) {
        const mimeType = "video/webm";
        const stream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: true,
        });
        setStreamScreen(stream);
        handleRecord({ stream, mimeType }, "screen", uuid);
    }


    const SVGNo = (index) => {
        return (
            <div className="index-box">
                <h className="index-text">{index}</h>
                <img alt='index-box' src={IndexBox} />
            </div>
        );

    }

    function Recording() {
        var temp_backend = null;
        useEffect(() => {
            if (!isScreenRecord && allowsRecord['screenToggleAllows']) {
                setIsScreenRecord(true);
                recordScreen(questionnaire_uuid);
            }

            if (!isVideoRecord && allowsRecord['webcamToggleAllows']) {
                setIsVideoRecord(true);
                recordVideo(questionnaire_uuid);
                start_end_time[0] = getCurrentTime();
            }
        }, []);
        return temp_backend;
    };

    const TestComp = (index, text) => {
        var className = index % 2;
        const [value, setValue] = useState(-1);
        const [isChanged, setIsChanged] = useState(null);
        const [onHover, setOnHover] = useState(false);
        const handleCheckedChange = (n) => {
            timeStamp[index - 1] = [...timeStamp[index - 1], getCurrentTime()];
            if (isChanged == null) {
                for (var i = 0; i < (index - 1); i++) {
                    if (!isChecked[i] && !(behavior[i].includes('Skip'))) {
                        behavior[i] = behavior[i] + '|Skip|';
                    }
                }
                setIsChanged(false);
                isChecked[index - 1] = true;
                clickTime[index - 1] = moment().format('HH:mm:ss');
            }

            if (isChanged) {
                changedTimeStamp[index - 1] = [...changedTimeStamp[index - 1], getCurrentTime()];
                if (!behavior[index - 1].includes('Changed')) {
                    behavior[index - 1] = behavior[index - 1] + '|Changed|';
                }
            } else {
                setIsChanged(true);
            }
            setValue(n)
            const tmp_totalValue = update(totalValues, { [index - 1]: { $set: n } });
            setTotalValues(tmp_totalValue);
        };

        const handleOnMouseOver = () => {
            if (!onHover) {
                setOnHover(true);
                startHover[index - 1] = getCurrentTime();
            }
        }
        const handleOnMouseLeave = () => {
            if (onHover) {
                setOnHover(false);
                var before = (startHover[index - 1] - start_end_time[0]);
                var now = (getCurrentTime() - start_end_time[0]);
                var sumTime = now - before;
                scopeTime[index - 1] += sumTime;
                fontEndTimeStamp[index - 1] = [...fontEndTimeStamp[index - 1], [before, now]];
            }
        }
        const formContainer = (n) => {
            return (
                <div>
                    <FormControlLabel
                        value={n}
                        checked={value === n}
                        onChange={() => handleCheckedChange(n)}
                        control={<Radio />}
                        label={<Typography style={(value === n) ? { fontWeight: 'bold' } : null}>{n}</Typography>}
                        labelPlacement="bottom"
                        disabled={isResultSubmit ? true : false}
                    />
                </div>
            );
        }
        return (
            <div className={`test-component _${className}`} id={`id_${index}`} onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
                {SVGNo(index)}
                <div></div>
                <h>{text}</h>
                <div className="Slider-container">
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            {formContainer(0)}
                            {formContainer(1)}
                            {formContainer(2)}
                            {formContainer(3)}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        );
    }

    function handleOnSubmit() {
        start_end_time[1] = getCurrentTime();
        const sum = totalValues.reduce((result, number) => result + number);
        setTotalScore(sum);
        stopRecord();
        setIsResultSubmit(true);
        ResultAnswerSenderService(questionnaire_uuid, totalValues, null);
    }

    function handleScrollToResult() {
        var i = 0;
        while (i < 5) {
            i++;
            try {
                setTimeout(() => {
                    var container = document.getElementById('result-card-container');
                    container.scrollIntoView({ behavior: "smooth", block: 'center' })
                }, 500)
                break;
            } catch {
            }
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value);
        if (e != undefined) {
            emailFiled = e.target.value.includes(".com") && e.target.value.includes("@")
        }
    }

    return (
        <div>
            <LoadingPopup open={isLoading} />
            <Recording />
            <PHQTitleCard />
            <Container className="test-container">
                {TestComp(1, "เบื่อ ทำอะไร ๆ ก็ไม่เพลิดเพลิน")}
                {TestComp(2, "ไม่สบายใจ ซึมเศร้า หรือท้อแท้")}
                {TestComp(3, "หลับยาก หรือหลับ ๆ ตื่น ๆ หรือหลับมากไป")}
                {TestComp(4, "เหนื่อยง่าย หรือไม่ค่อยมีแรง")}
                {TestComp(5, "เบื่ออาหาร หรือกินมากเกินไป")}
                {TestComp(6, "รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือเป็นคนทำให้ตัวเอง หรือครอบครัวผิดหวัง")}
                {TestComp(7, "สมาธิไม่ดีเวลาทำอะไร เช่น ดูโทรทัศน์ ฟังวิทยุ หรือทำงานท่ีต้องใช้ความตั้งใจ")}
                {TestComp(8, "พูดหรือทำอะไรช้าจนคนอื่นมองเห็น หรือกระสับกระส่ายจนท่านอยู่ไม่นิ่งเหมือนเคย")}
                {TestComp(9, "คิดทำร้ายตนเอง หรือคิดว่าถ้าตาย ๆ ไปเสียคงจะดี")}
                <div className="email-container">
                    <TextField
                        className="email-text-container"
                        id="outlined-basic"
                        label="E-mail"
                        variant="outlined"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                {isResultSubmit ? handleScrollToResult() : null}
                {isResultSubmit ?
                    <Result
                        score={totalScore}
                        uuid={questionnaire_uuid}
                        to_email={email}
                        start_end_time={start_end_time}
                        fontEndTimeStamp={fontEndTimeStamp}
                        clickTime={clickTime}
                        hoverTime={scopeTime}
                        behavior={behavior}
                    />
                    : <Button
                        disabled={(!(isChecked.every(bool => bool)) && !emailFiled)}
                        variant="contained"
                        size="large"
                        className="submit-button"
                        onClick={() => handleOnSubmit()}
                    >ส่งคำตอบ</Button>
                }
            </Container>
        </div>
    );
};

export default PHQTestComponent;