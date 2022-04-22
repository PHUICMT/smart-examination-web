const axios = require("axios");

export async function handleOnSendExamResult(data) {
  //For student on finish exam
  return await axios
    .post("/save-result", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (result) {
      console.log(result);
      //TODO do when post api success
      return true;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function handleOnSaveExamCreated(data) {
  // For teacher on create exam
  const json = JSON.stringify({
    examPin: data.examPin,
    examName: data.examName,
    teacherId: data.teacherId,
    itemCount: data.examItems.length,
    examItems: data.examItems,
    score: data.score,
  });
  return await axios
    .post("server:5000/save-exam", json, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (result) {
      console.log(result);
      //TODO do when post api success
    })
    .catch(function (error) {
      console.log(error);
    });
}
