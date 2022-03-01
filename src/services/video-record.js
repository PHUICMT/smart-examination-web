const VideoStreaming = require("./video-streaming");

export function videoRecorder(studentId, supject) {
  let fileName = getFileName(studentId, supject);
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    VideoStreaming.sendDataToStreamServer(stream, fileName);
  });

  if (hasGetUserMedia()) {
  } else {
    alert("getUserMedia() is not supported in your browser");
  }
}

export function stopRecording() {
  //   window.localStream.getTracks().forEach((track) => {
  //     track.stop();
  //   });
  console.log("Stop record");
}

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

function hasGetUserMedia() {
  return !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );
}
