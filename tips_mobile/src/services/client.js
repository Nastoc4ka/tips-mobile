import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

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

