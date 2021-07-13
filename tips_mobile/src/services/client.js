import axios from 'axios';

const baseURL = 'http://10.100.0.59:8080/api';
//localhost
//172.20.10.2
//10.100.3.53
const client = axios.create({
  baseURL,
});

const catchError = errorType => err => {
  if (err.response?.data?.msg) {
    throw new errorType(err.response.data.msg);
  }
  const msg = {
    title: 'Ошибка сервера',
    text: '',
  };
  throw new errorType(msg);
};

export {client, catchError};
