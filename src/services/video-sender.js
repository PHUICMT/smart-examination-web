const axios = require("axios");

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

export async function uploadVideo(params) {
  try {
    await axios
      .post("localhost:5000/upload-video", params, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  } catch (e) {
    console.error(e);
    return e;
  }
}
