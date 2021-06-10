import {
    LOGIN_FAIL,
    LOGIN_SAGA,
    LOGIN_SUCCESS,
} from './types';

const loginSaga = (loginData) => {
    return {
        type: LOGIN_SAGA,
        payload: loginData
    }
};

const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
};

const loginFail = () => {
    return {
        type: LOGIN_FAIL,
    }
};

export {
    loginSaga,
    loginSuccess,
    loginFail,
}