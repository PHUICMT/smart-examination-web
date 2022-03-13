const VideoSender = require("./video-sender");
const RecordRTC = require("recordrtc");

export default function HandleRecorder() {
  console.log("Create HandleRecorder object");

  let studentId = null;
  let supject = null;

  let recordVideo = null;
  let recording = false;
  let uploading = false;

  let src = null;

  const startRecord = () => {
    captureUserMedia((stream) => {
      recordVideo = RecordRTC(stream, { type: "video" });
      recordVideo.startRecording();
      recording = true;
    });
  };

  const stopRecord = () => {
    const fileName = getFileName(studentId, supject);
    if (recordVideo !== null) {
      recordVideo.stopRecording(() => {
        let params = {
          type: "video/webm",
          data: recordVideo.blob,
          id: fileName,
        };
        recording = false;
        uploading = true;
        console.log("File name : " + fileName);
        console.log(recordVideo);
        //TODO Send video to server
      });
    }
  };

  function getFileName(studentId, supject) {
    const dateNow = () => {
      let timestamp = Date.now();
      let dateObject = new Date(timestamp);

      let date = dateObject.getDate();
      let month = dateObject.getMonth() + 1;
      let year = dateObject.getFullYear();

      return year + "-" + month + "-" + date;
    };
    return "[" + supject + "]-" + "[" + studentId + "]-" + dateNow() + ".mp4";
  }

  function captureUserMedia(callback) {
    var params = { audio: false, video: true };

    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
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
    startRecord,
    stopRecord,
  };
}
