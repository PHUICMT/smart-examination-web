const axios = require("axios");

export async function handleOnGetExam(examPin) {
  return await axios
    .get("http://localhost:5000/get-exam", { params: { exampin: examPin } })
    .then(function (result) {
      const response = result.data;
      if (response !== false) {
        return response;
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}