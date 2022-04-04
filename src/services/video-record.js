const VideoSender = require("./video-sender");
const RecordRTC = require("recordrtc");

export default function HandleRecorder() {
  let studentId = null;
  let supject = null;
  let exam_pin = null;
  let recordVideo = null;

  const startRecord = () => {
    captureUserMedia((stream) => {
      recordVideo = RecordRTC(stream, { type: "video" });
      recordVideo.startRecording();
    });
  };

  const stopRecord = async () => {
    const fileName = getFileName(studentId, supject, exam_pin);
    if (recordVideo !== null) {
      recordVideo.stopRecording(() => {
        var videoBlob = recordVideo.blob;
        VideoSender.uploadVideo(videoBlob, fileName).then((res) => {
          recordVideo.destroy();
          return res;
        });
      });
    }
  };

  function getFileName(studentId, supject, exam_pin) {
    const dateNow = () => {
      let timestamp = Date.now();
      let dateObject = new Date(timestamp);

      let date = dateObject.getDate();
      let month = dateObject.getMonth() + 1;
      let year = dateObject.getFullYear();
      let hours = dateObject.getHours();
      let minutes = dateObject.getMinutes();
      let seconds = dateObject.getSeconds();

      return (
        year +
        "_" +
        month +
        "_" +
        date +
        "_" +
        hours +
        "_" +
        minutes +
        "_" +
        seconds
      );
    };
    return (
      "[" +
      exam_pin +
      "]-[" +
      supject +
      "]-[" +
      studentId +
      "]-[" +
      dateNow() +
      "].webm"
    );
  }

  function captureUserMedia(callback) {
    var params = { audio: false, video: true };

    navigator.getUserMedia(params, callback, (error) => {
      alert(error);
    });
  }

  return {
    setUpStudentId(setStudentId) {
      if (setStudentId !== undefined) {
        studentId = setStudentId;
      }
    },
    setUpSupject(setSupject) {
      if (setSupject !== undefined) {
        supject = setSupject;
      }
    },
    setUpExamPin(exampin) {
      if (exampin !== undefined) {
        exam_pin = exampin;
      }
    },
    startRecord,
    stopRecord,
  };
}
