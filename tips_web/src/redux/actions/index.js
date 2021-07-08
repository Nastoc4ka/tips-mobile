import {
  LOGIN_FAIL,
  LOGIN_SAGA,
  LOGIN_SUCCESS,
  GET_ORGANIZATIONS_SAGA,
  GET_ORGANIZATIONS_FAIL,
  GET_ORGANIZATIONS_SUCCESS,
  GET_STAFF_SAGA,
  GET_STAFF_FAIL,
  GET_STAFF_SUCCESS,
  CAMERA_ON,
  CAMERA_OFF,
  SET_CHOSEN_ORGANIZATION,
  ADD_USER_SAGA,
  SEND_SMS_SAGA,
  SET_ERRORS,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
} from "./types";

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

const getOrganizationsSaga = (adminId) => {
  return {
    type: GET_ORGANIZATIONS_SAGA,
    payload: adminId,
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

const getStaffSaga = (orgId) => {
  return {
    type: GET_STAFF_SAGA,
    payload: orgId,
  };
};

const getStaffSuccess = (staff) => {
  return {
    type: GET_STAFF_SUCCESS,
    payload: staff,
  };
};

const getStaffFail = () => {
  return {
    type: GET_STAFF_FAIL,
  };
};

const cameraOn = () => {
  return {
    type: CAMERA_ON,
  };
};

const cameraOff = () => {
  return {
    type: CAMERA_OFF,
  };
};

const setChosenOrganization = (id) => {
  return {
    type: SET_CHOSEN_ORGANIZATION,
    payload: id,
  };
};

const addUserSaga = (data) => {
  return {
    type: ADD_USER_SAGA,
    payload: data,
  };
};

const addUserSuccess = () => {
  return {
    type: ADD_USER_SUCCESS,
  };
};

const addUserFail = () => {
  return {
    type: ADD_USER_FAIL,
  };
};

const sendSMSSaga = (data) => {
  return {
    type: SEND_SMS_SAGA,
    payload: data,
  };
};

export {
  loginSaga,
  loginSuccess,
  loginFail,
  getOrganizationsSaga,
  getOrganizationsSuccess,
  getOrganizationsFail,
  getStaffSaga,
  getStaffSuccess,
  getStaffFail,
  cameraOn,
  cameraOff,
  setChosenOrganization,
  addUserSaga,
  addUserSuccess,
  addUserFail,
  sendSMSSaga,
};
