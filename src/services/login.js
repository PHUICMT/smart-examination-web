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
      console.log(result);
      //TODO do when post api success
      // history.push("/index");
    })
    .catch(function (error) {
      console.log(error);
    });
}
