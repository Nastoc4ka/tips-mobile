import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginSuccess,
  getOrganizationsSuccess,
  getStaffSuccess,
  sendSMSSaga,
  addUserSuccess,
  addUserFail,
  getStaffSaga,
} from "../redux/actions";
import { authService, organizationsService, smsService } from "../services";

import {
  LOGIN_SAGA,
  GET_ORGANIZATIONS_SAGA,
  GET_STAFF_SAGA,
  ADD_USER_SAGA,
  SEND_SMS_SAGA,
  UPDATE_USER_SAGA,
  DELETE_USER_SAGA,
} from "../redux/actions/types";
import updateUserDataService from "../services/updateUserData";
import deleteUserService from "../services/deleteUserService";

export function* sagaWatcher() {
  yield takeEvery(LOGIN_SAGA, loginSaga);
  yield takeEvery(GET_ORGANIZATIONS_SAGA, fetchOrganizationsSaga);
  yield takeEvery(GET_STAFF_SAGA, fetchStaffSaga);
  yield takeEvery(ADD_USER_SAGA, addUserSaga);
  yield takeEvery(SEND_SMS_SAGA, sendSMS);
  yield takeEvery(UPDATE_USER_SAGA, updateUserSaga);
  yield takeEvery(DELETE_USER_SAGA, deleteUserSaga);
}

function* loginSaga(action) {
  try {
    const payload = yield call(() => authService.login(action.payload));
    yield put(loginSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

function* fetchOrganizationsSaga(action) {
  try {
    const payload = yield call(() =>
      organizationsService.getOrganizations(action.payload)
    );
    yield put(getOrganizationsSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

function* fetchStaffSaga(action) {
  try {
    const payload = yield call(() =>
      organizationsService.getStaff(action.payload)
    );
    yield put(getStaffSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

function* addUserSaga(action) {
  try {
    console.log(action.payload);
    const payload = yield call(() =>
      organizationsService.addUser(action.payload)
    );
    yield put(addUserSuccess());

    const phone = action.payload.phoneNumber
      .split("")
      .filter((el) => !isNaN(el) && el !== " ")
      .join("");

    const data = {
      phone,
      message: `Уважаемый(ая) ${action.payload.firstName} ${action.payload.lastName}, ваш пароль: ${action.payload.password}`,
    };
    // yield put(sendSMSSaga(data));
  } catch (error) {
    console.log(error);
    yield put(addUserFail());
  }
}

function* sendSMS(action) {
  try {
    const payload = yield call(() => smsService.sendSMS(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* updateUserSaga(action) {
  try {
    const updatedUser = yield call(() => updateUserDataService(action.payload));
    const phone = action.payload.phoneNumber
      .split("")
      .filter((el) => !isNaN(el) && el !== " ")
      .join("");

    const data = {
      phone,
      message: `Уважаемый(ая) ${action.payload.firstName} ${action.payload.lastName}, ваш aккаунт верифицирован!`,
    };
    // yield put(sendSMSSaga(data));
    yield put(getStaffSaga(action.payload.organizationId));
  } catch (error) {
    console.log(error);
  }
}

function* deleteUserSaga(action) {
  try {
    const deleteUser = yield call(() => deleteUserService(action.payload.id));
    const phone = action.payload.phoneNumber
      .split("")
      .filter((el) => !isNaN(el) && el !== " ")
      .join("");
    //verify or not verify - we need to change msg
    const data = {
      phone,
      message: `Уважаемый(ая) ${action.payload.firstName} ${action.payload.lastName}, ваш aккаунт верифицирован!`,
    };
    // yield put(sendSMSSaga(data));
    yield put(getStaffSaga(action.payload.organizationId));
  } catch (error) {
    console.log(error);
  }
}
