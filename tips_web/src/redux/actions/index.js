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
};
