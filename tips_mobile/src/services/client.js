import axios from 'axios';

<<<<<<< HEAD
const baseURL = 'http://10.100.3.248:8080/api';
=======
const baseURL = 'http://localhost:8080/api';
>>>>>>> f42a7bc7fb80725b95ce5587dd322c88486c86a9
//localhost
//10.100.2.172
const client = axios.create({
    baseURL
});

const catchError = (errorType) => (err) => {
    if (err.response?.data?.msg) {
        throw new errorType(err.response.data.msg);
    }
    const msg = {
        title: "Ошибка сервера",
        text: ""
    };
    throw new errorType(msg);
};

export {
    client,
    catchError,
}

