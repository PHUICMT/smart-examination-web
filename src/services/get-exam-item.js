const axios = require("axios");

export async function handleOnGetExam(examPin) {
  return await axios
    .get("/get-exam", { params: { exampin: examPin } })
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

export async function handleOnGetExamAll() {
  return await axios
    .get("/get-exam-all")
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

export async function handleOnGetResult(examPin) {
  return await axios
    .get("/get-result", { params: { exampin: examPin } })
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
