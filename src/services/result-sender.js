const axios = require("axios");

export async function handleOnSendExamResult(data) {
  //For student on finish exam
  return await axios
    .post("http://localhost:5000/save-result", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (result) {
      console.log(result);
      //TODO do when post api success
      // history.push("/index");
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function handleOnSaveExamCreated(data) {
  // For teacher on create exam
  const json = JSON.stringify({
    examPin: data.examPin,
    examItems: data.examItems,
    teacherId: data.teacherId,
  });
  return await axios
    .post("http://localhost:5000/save-exam", json, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (result) {
      console.log(result);
      //TODO do when post api success
      // history.push("/index");
    })
    .catch(function (error) {
      console.log(error);
    });
}
