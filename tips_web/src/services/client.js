import axios from "axios";

const baseURL = "http://192.168.43.130:8080/api";
//localhost
//192.168.43.130
//10.100.2.104
const client = axios.create({
  baseURL,
});

const catchError = (errorType) => (err) => {
  if (err.response && err.response.data && err.response.data.msg) {
    throw new errorType(err.response.data.msg);
  }
  throw new errorType("Something went wrong... please contact vendor");
};

export { client, catchError };
