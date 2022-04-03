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
      return result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
