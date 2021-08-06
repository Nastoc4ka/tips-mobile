import {
  CLEAR_MESSAGE,
  GET_ORGANIZATIONS_FAIL,
  GET_ORGANIZATIONS_SAGA,
  GET_ORGANIZATIONS_SUCCESS,
  HIDE_BLUR,
  HIDE_LOADING,
  LOGIN_FAIL,
  LOGIN_SAGA,
  LOGIN_SCREEN_SHOW,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SAGA,
  REGISTER_FAIL,
  REGISTER_INIT,
  REGISTER_SAGA,
  REGISTER_SUCCESS,
  REGISTRATION_SCREEN_SHOW,
  REMOVE_PIN_AUTHENTICATION,
  SEND_DATA_ACTIVE,
  SEND_DATA_DISABLE,
  SET_MESSAGE,
  SET_PIN_AUTHENTICATION_SAGA,
  SHOW_BLUR,
  SHOW_LOADING,
  PIN_AUTHENTICATION_SUCCESS,
  UPDATE_USER_SAGA,
  PIN_AUTHENTICATIED_FALSE,
  GET_LOCAL_DATA_SAGA,
  SET_PIN_AUTHENTICATION,
  SET_CONFIRM_CURRENT_PASSWORD_SAGA,
  CURRENT_PASSWORD_CONFIRMED,
  CURRENT_PASSWORD_SET_FALSE,
  UPDATE_PASSWORD_SAGA,
  CHANGE_BIRTHDATE_ACCESS_SAGA,
  PIN_CHANGE_ACTIVE,
  PIN_CHANGE_DISABLE,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const changeBirthdateAccessSaga = (access) => {
  return {
    type: CHANGE_BIRTHDATE_ACCESS_SAGA,
    payload: access,
  };
};
const getLocalDataSaga = () => {
  return {
    type: GET_LOCAL_DATA_SAGA,
  };
};
const updatePasswordSaga = (password) => {
  return {
    type: UPDATE_PASSWORD_SAGA,
    payload: password,
  };
};
const pinAuthenticationSuccess = () => {
  return {
    type: PIN_AUTHENTICATION_SUCCESS,
  };
};
const removePinAuthentication = () => {
  AsyncStorage.removeItem('pin');
  return {
    type: REMOVE_PIN_AUTHENTICATION,
  };
};
const setPinAuthenticationSaga = (pin) => {
  return {
    type: SET_PIN_AUTHENTICATION_SAGA,
    payload: pin,
  };
};
const setConfirmCurrentPasswordSaga = (password) => {
  return {
    type: SET_CONFIRM_CURRENT_PASSWORD_SAGA,
    payload: password,
  };
};
const currentPasswordConfirmed = () => {
  return {
    type: CURRENT_PASSWORD_CONFIRMED,
  };
};
const currentPasswordSetFalse = () => {
  return {
    type: CURRENT_PASSWORD_SET_FALSE,
  };
};
const setPinAuthentication = (pin) => {
  return {
    type: SET_PIN_AUTHENTICATION,
    payload: pin,
  };
};
const pinAuthenticatiedFalse = () => {
  return {
    type: PIN_AUTHENTICATIED_FALSE,
  };
};

const loginScreenShow = () => {
  return {
    type: LOGIN_SCREEN_SHOW,
  };
};

const registrationScreenShow = () => {
  return {
    type: REGISTRATION_SCREEN_SHOW,
  };
};

const sendDataDisable = () => {
  return {
    type: SEND_DATA_DISABLE,
  };
};

const sendDataActive = () => {
  return {
    type: SEND_DATA_ACTIVE,
  };
};

const updateUserSaga = (updateUser) => {
  return {
    type: UPDATE_USER_SAGA,
    payload: updateUser,
  };
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
    payload: registrationData,
  };
};

const getOrganizationsSaga = () => {
  return {
    type: GET_ORGANIZATIONS_SAGA,
  };
};

const getOrganizationsSuccess = (organizations) => {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    payload: organizations,
  };
};

const getOrganizationsFail = () => {
  return {
    type: GET_ORGANIZATIONS_FAIL,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

const registerInit = () => {
  return {
    type: REGISTER_INIT,
  };
};

const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};

const loginSaga = (loginData) => {
  return {
    type: LOGIN_SAGA,
    payload: loginData,
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
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
  };
};

const hideBlur = () => {
  return {
    type: HIDE_BLUR,
  };
};

const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

const hideLoading = () => {
  return {
    type: HIDE_LOADING,
  };
};

const pinChangeActive = () => {
  return {
    type: PIN_CHANGE_ACTIVE,
  };
};

const pinChangeDisable = () => {
  return {
    type: PIN_CHANGE_DISABLE,
  };
};

export {
  loginSaga,
  loginSuccess,
  loginFail,
  logoutSaga,
  logout,
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
  getOrganizationsFail,
  getOrganizationsSuccess,
  getOrganizationsSaga,
  registrationScreenShow,
  loginScreenShow,
  sendDataActive,
  sendDataDisable,
  updateUserSaga,
  pinAuthenticatiedFalse,
  setPinAuthenticationSaga,
  setPinAuthentication,
  removePinAuthentication,
  pinAuthenticationSuccess,
  getLocalDataSaga,
  setConfirmCurrentPasswordSaga,
  currentPasswordConfirmed,
  currentPasswordSetFalse,
  updatePasswordSaga,
  changeBirthdateAccessSaga,
  pinChangeActive,
  pinChangeDisable,
};
