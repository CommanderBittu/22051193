const axios = require('axios');

const url = "http://20.244.56.144/evaluation-service/auth";

const data = {
  email: "22051193@kiit.ac.in",
  name: "Shashank Yadav",
  rollNo: "22051193",
  accessCode: "nwpwrZ",
  clientID: "801016a0-a828-4cd3-ac89-50a9b458c41e",
  clientSecret: "FTyJcSwvfafjjKCV"
};

console.log("Sending request to:", url);
console.log("With payload:", JSON.stringify(data, null, 2));

axios.post(url, data, {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    console.log("Response status:", response.status);
    console.log("Full response:", response.data);
    
    if (response.status === 200) {
      const { token_type, access_token, expires_in } = response.data;
      console.log("Authentication Successful!");
      console.log("Token Type:", token_type);
      console.log("Access Token:", access_token);
      console.log("Expires In:", expires_in);
    }
  })
  .catch(error => {
    console.log("Error occurred!");
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received. Request details:", error.request._currentUrl);
      console.error("Request timeout or network issue");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  });