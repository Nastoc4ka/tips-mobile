import { call, put, takeEvery } from "redux-saga/effects";
import { loginSuccess, getOrganizationsSuccess } from "../redux/actions";
import { authService, organizationsService } from "../services";

import { LOGIN_SAGA, GET_ORGANIZATIONS_SAGA } from "../redux/actions/types";

export function* sagaWatcher() {
  yield takeEvery(LOGIN_SAGA, loginSaga);
  yield takeEvery(GET_ORGANIZATIONS_SAGA, fetchOrganizationsSaga);
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
      organizationsService.getOrganizations(action.payload)
    );
    yield put(getOrganizationsSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}
