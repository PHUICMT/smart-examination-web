const axios = require("axios");

export async function login(userId) {
  const packedData = {
    userId: userId,
  };
  const jsonData = JSON.stringify(packedData);

  return await axios
    .post("http://localhost:5000/login", jsonData, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (result) {
      const data = result.data.login[0];
      const isStudent = data[4] === 1;
      const resultObject = {
        userId: data[0],
        name: data[1],
        surname: data[2],
        startAt: data[3],
        isStudent: isStudent,
      };
      return resultObject;
    })
    .catch(function () {
      return false;
    });
}
