const axios = require("axios");

export async function getSubject() {
  return await axios
    .get("http://localhost:5000/get-subject")
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
