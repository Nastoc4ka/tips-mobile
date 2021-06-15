import {
    LOGIN_FAIL,
    LOGIN_SAGA,
    LOGIN_SUCCESS,
    GET_ORGANIZATIONS_SAGA,
    GET_ORGANIZATIONS_FAIL,
    GET_ORGANIZATIONS_SUCCESS,
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

const getOrganizationsSaga = (adminId) => {
    return {
        type: GET_ORGANIZATIONS_SAGA,
        payload: adminId
    }
};

const getOrganizationsSuccess = (organizations) => {
    return {
        type: GET_ORGANIZATIONS_SUCCESS,
        payload: organizations

    }
};

const getOrganizationsFail = () => {
    return {
        type: GET_ORGANIZATIONS_FAIL,
    }
};

export {
    loginSaga,
    loginSuccess,
    loginFail,
    getOrganizationsSaga,
    getOrganizationsSuccess,
    getOrganizationsFail
}