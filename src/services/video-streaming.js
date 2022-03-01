import io from "socket.io-client";
import fs from "fs";

var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  credentials: true,
  allowEIO3: true,
  transports: ["websocket"],
};

let socket = io.connect("localhost:5000", connectionOptions); //TODO change path to docker container

export function getStreamingSocket() {
  return socket;
}

export function checkPermissions() {
  var location = window.location;
  var isSecureOrigin =
    location.protocol === "https:" || location.host === "localhost";
  if (!isSecureOrigin) {
    alert(
      "getUserMedia() must be run from a secure origin: HTTPS or localhost." +
        "\n\nChanging protocol to HTTPS"
    );
    location.protocol = "HTTPS";
  }
}

export function sendDataToStreamServer(data, filename) {
  // send data
  socket.on("filename", function (stream) {
    fs.createReadStream(data).pipe(stream);
  });
}
