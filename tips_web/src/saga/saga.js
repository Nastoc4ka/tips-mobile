import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginSuccess,
  getOrganizationsSuccess,
  getStaffSuccess,
  sendSMSSaga,
  addUserSuccess,
  addUserFail,
} from "../redux/actions";
import { authService, organizationsService, smsService } from "../services";

import {
  LOGIN_SAGA,
  GET_ORGANIZATIONS_SAGA,
  GET_STAFF_SAGA,
  ADD_USER_SAGA,
  SEND_SMS_SAGA,
} from "../redux/actions/types";

export function* sagaWatcher() {
  yield takeEvery(LOGIN_SAGA, loginSaga);
  yield takeEvery(GET_ORGANIZATIONS_SAGA, fetchOrganizationsSaga);
  yield takeEvery(GET_STAFF_SAGA, fetchStaffSaga);
  yield takeEvery(ADD_USER_SAGA, addUserSaga);
  yield takeEvery(SEND_SMS_SAGA, sendSMS);
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
      .filter((el) => !isNaN(el) && el != " ")
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
