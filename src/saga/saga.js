import {call, put, takeEvery} from 'redux-saga/effects';
import {
    loginFail,
    loginLoading,
    loginSuccess,
    logout,
    registerFail,
    registerLoading,
    registerSuccess,
    setMessage,
    getOrganisationsFail,
    getOrganisationsLoading,
    getOrganisationsSuccess,
} from '../redux/actions';
import {authService, organisationsService} from '../services';
import {UnauthorizedError, OrganisationsError} from "../errors";

import {
    LOGIN_SAGA,
    LOGOUT_SAGA,
    REGISTER_SAGA,
    GET_ORGANISATIONS_SAGA
} from "../redux/actions/types";

export function* sagaWatcher() {
    yield takeEvery(LOGIN_SAGA, loginSaga);
    yield takeEvery(GET_ORGANISATIONS_SAGA, fetchOrganisationsSaga);
    yield takeEvery(REGISTER_SAGA, registerSaga);
    yield takeEvery(LOGOUT_SAGA, logoutSaga);

}

function* fetchOrganisationsSaga() {
    try {
        yield put(getOrganisationsLoading());
        const payload = yield call(() => organisationsService.getOrganisations());
        yield put(getOrganisationsSuccess(payload));
    } catch (error) {
        yield put(getOrganisationsFail(error));
    }
}

function* loginSaga(action) {
    try {
        yield put(loginLoading());
        const payload = yield call(() => authService.login(action.payload));
        yield delay(500);
        yield put(loginSuccess(payload))
    } catch (error) {
        yield put(loginFail());
        yield put(setMessage(error.msg));
    }
}

function* logoutSaga() {
    try {
        yield put(loginLoading());
        yield call(() => authService.logout());
        yield delay(500);
        yield put(logout())
    } catch (error) {
        //yield put(logoutFail());
        yield put(setMessage(error.msg));
    }
}

function* registerSaga(action) {
    try {
        yield put(registerLoading());
        const payload = yield call(() => authService.register(action.payload));
        yield put(registerSuccess(payload))
    } catch (error) {
        yield put(registerFail());
        yield put(setMessage(error.msg));
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
}