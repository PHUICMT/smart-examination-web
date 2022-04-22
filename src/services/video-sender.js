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

export async function uploadVideo(data, fileName) {
  var formData = new FormData();
  formData.append("file", data);
  formData.append("fileName", fileName);

  try {
    await axios
      .post("/upload-video", formData, {
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
        return e;
      });
  } catch (e) {
    return e;
  }
}
