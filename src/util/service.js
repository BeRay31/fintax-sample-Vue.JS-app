import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: 'https://reqres.in/',
  timeout: 5000 // request timeout
});


service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error");
    console.log({...error}); // for debug
    return Promise.reject(error);
  }
);

export default service;
