const axios = require("axios");

export async function saveExam(exam) {
  try {
    return await axios
      .post("server:5000/save-exam", exam, {
        headers: {
          "Content-Type": "application/json",
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
