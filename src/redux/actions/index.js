import {
    CLEAR_MESSAGE,
    LOGIN_FAIL,
    LOGIN_LOADING,
    LOGIN_SAGA,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_SAGA,
    REGISTER_FAIL,
    REGISTER_INIT,
    REGISTER_LOADING,
    REGISTER_SAGA,
    REGISTER_SUCCESS,
    SET_MESSAGE,
    GET_ORGANISATIONS_SAGA,
    GET_ORGANISATIONS_FAIL,
    GET_ORGANISATIONS_SUCCESS,
    GET_ORGANISATIONS_LOADING,

} from "./types"

const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

const registerSaga = (registrationData) => {
    return {
        type: REGISTER_SAGA,
        payload: registrationData
    }
};

const getOrganisationsSaga = () => {
    return {
        type: GET_ORGANISATIONS_SAGA,
    }
};

const getOrganisationsSuccess = (organisations) => {
    return {
        type: GET_ORGANISATIONS_SUCCESS,
        payload: organisations

    }
};

const getOrganisationsLoading = () => {
    return {
        type: GET_ORGANISATIONS_LOADING,
    }
};

const getOrganisationsFail = () => {
    return {
        type: GET_ORGANISATIONS_FAIL,
    }
};

const registerLoading = () => {
    return {
        type: REGISTER_LOADING
    }
};

const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    }
};

const registerFail = () => {
    return {
        type: REGISTER_FAIL,
    }
};

const registerInit = () => {
    return {
        type: REGISTER_INIT,
    }
};

const loginSaga = (loginData) => {
    return {
        type: LOGIN_SAGA,
        payload: loginData
    }
};

const loginLoading = () => {
    return {
        type: LOGIN_LOADING,
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

const logoutSaga = () => {

    return {
        type: LOGOUT_SAGA,
    };
};

const logout = () => {

    return {
        type: LOGOUT,
    };
};

export {
    loginSaga,
    loginLoading,
    loginSuccess,
    logoutSaga,
    logout,
    loginFail,
    registerInit,
    registerSaga,
    registerLoading,
    registerSuccess,
    registerFail,
    setMessage,
    clearMessage,

    getOrganisationsFail,
    getOrganisationsLoading,
    getOrganisationsSuccess,
    getOrganisationsSaga
};