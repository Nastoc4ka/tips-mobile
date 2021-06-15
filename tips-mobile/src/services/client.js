import axios from 'axios';

const baseURL = 'http://10.100.3.158:8080/api';
//localhost
//10.100.3.158
const client = axios.create({
    baseURL
});

const catchError = (errorType) => (err) => {
    if (err.response && err.response.data && err.response.data.msg) {
        throw new errorType(err.response.data.msg);
    }
    throw new errorType('Something went wrong... please contact vendor');
};

export {
    client,
    catchError,
}

