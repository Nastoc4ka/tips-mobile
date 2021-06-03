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
    SET_MESSAGE,
    SHOW_BLUR,
    HIDE_BLUR,
    SHOW_LOADING,
    HIDE_LOADING,
    GET_ORGANISATIONS_SAGA,
    GET_ORGANISATIONS_FAIL,
    GET_ORGANISATIONS_SUCCESS,

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
}

const hideBlur = () => {
    return {
        type: HIDE_BLUR,
    }
}

const showLoading = () => {
    return {
        type: SHOW_LOADING,
    }
}

const hideLoading = () => {
    return {
        type: HIDE_LOADING,
    }
}

export {
    loginSaga,
    loginSuccess,
    logoutSaga,
    logout,
    loginFail,
    registerSaga,
    registerSuccess,
    registerFail,
    setMessage,
    clearMessage,
    showBlur,
    hideBlur,
    showLoading,
    hideLoading,
    getOrganisationsFail,
    getOrganisationsSuccess,
    getOrganisationsSaga
};