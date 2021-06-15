import {
    CLEAR_MESSAGE,
    LOGIN_FAIL,
    LOGIN_SAGA,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_SAGA,
    REGISTER_FAIL,
    REGISTER_SAGA,
    REGISTER_SUCCESS,
    REGISTER_INIT,
    SET_MESSAGE,
    SHOW_BLUR,
    HIDE_BLUR,
    SHOW_LOADING,
    HIDE_LOADING,
    GET_ORGANISATIONS_SAGA,
    GET_ORGANISATIONS_FAIL,
    GET_ORGANISATIONS_SUCCESS,
    LOGIN_SCREEN_SHOW,
    REGISTRATION_SCREEN_SHOW,
    SET_AUTHENTICATION,
    SEND_DATA_DISABLE,
    SEND_DATA_ACTIVE,
    UPDATE_USER_SAGA
} from "./types"

const loginScreenShow = () => {
    return {
        type: LOGIN_SCREEN_SHOW
    }
};

const registrationScreenShow = () => {
    return {
        type: REGISTRATION_SCREEN_SHOW
    }
};

const sendDataDisable = () => {
    return {
        type: SEND_DATA_DISABLE
    }
};

const sendDataActive = () => {
    return {
        type: SEND_DATA_ACTIVE
    }
};

const updateUserSaga = (updateUser) => {
    return {
        type: UPDATE_USER_SAGA,
        payload: updateUser
    }
};

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

const getOrganisationsFail = () => {
    return {
        type: GET_ORGANISATIONS_FAIL,
    }
};


const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    }
};

const registerInit = () => {
    return {
        type: REGISTER_INIT
    }
};

const registerFail = () => {
    return {
        type: REGISTER_FAIL,
    }
};

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

const showBlur = () => {
    return {
        type: SHOW_BLUR,
    }
};

const hideBlur = () => {
    return {
        type: HIDE_BLUR,
    }
};

const showLoading = () => {
    return {
        type: SHOW_LOADING,
    }
};

const hideLoading = () => {
    return {
        type: HIDE_LOADING,
    }
};

const setAuthentication = () => {
    return {
        type: SET_AUTHENTICATION,
    }
};

export {
    loginSaga,
    loginSuccess,
    logoutSaga,
    logout,
    loginFail,
    registerSaga,
    registerSuccess,
    registerFail,
    registerInit,
    setMessage,
    clearMessage,
    showBlur,
    hideBlur,
    showLoading,
    hideLoading,
    getOrganisationsFail,
    getOrganisationsSuccess,
    getOrganisationsSaga,
    registrationScreenShow,
    loginScreenShow,
    setAuthentication,
    sendDataActive,
    sendDataDisable,
    updateUserSaga,

};