const VideoSender = require("./video-sender");
const RecordRTC = require("recordrtc");

export default function HandleRecorder() {
  console.log("Create HandleRecorder object");
  const hasGetUserMedia = !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
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
    recordVideo.stopRecording(() => {
      let params = {
        type: "video/webm",
        data: recordVideo.blob,
        id: fileName,
      };
      recording = false;
      uploading = true;
      //TODO Send video to server
    });
  };

  const requestUserMedia = () => {
    console.log("requestUserMedia");
    captureUserMedia((stream) => {
      src = window.URL.createObjectURL(stream);
      console.log("setting state", src);
    });
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
    return "[" + supject + "]" + "[" + studentId + "]" + dateNow + ".mp4";
  }

  function captureUserMedia(callback) {
    var params = { audio: false, video: true };

    navigator.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  }

  return {
    setUpStudentId(studentId) {
      if (studentId !== undefined) {
        this.studentId = studentId;
      }
    },
    setUpSupject(supject) {
      if (supject !== undefined) {
        this.supject = supject;
      }
    },
    getUserMedia() {
      if (!hasGetUserMedia) {
        alert(
          "Your browser cannot stream from your webcam. Please switch to Chrome or Firefox."
        );
        return;
      }
      requestUserMedia();
    },
    startRecord,
    stopRecord,
  };
}
