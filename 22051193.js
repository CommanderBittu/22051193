const axios = require('axios');

const url = "http://20.244.56.144/evaluation-service/register";

const data = {
  email: "22051193@kiit.ac.in",
  name: "Shashank yadav",
  mobileNo: "7007798946",
  githubUsername: "CommanderBittu",
  rollNo: "22051193",
  collegeName: "Kalinga Institute of Industrial Technology",
  accessCode: "nwpwrZ"
};

axios.post(url, data)
  .then(response => {
    const { clientID, clientSecret } = response.data;
    console.log("Registration Successful!");
    console.log("Client ID:", clientID);
    console.log("Client Secret:", clientSecret);
  })
  .catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });
