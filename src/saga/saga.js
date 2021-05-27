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
} from '../redux/actions';
import {authService} from '../services';

import {
    LOGIN_SAGA,
    LOGOUT_SAGA,
    REGISTER_SAGA
} from "../redux/actions/types";

export function* sagaWatcher() {
    yield takeEvery(LOGIN_SAGA, loginSaga);
    yield takeEvery(REGISTER_SAGA, registerSaga);
    yield takeEvery(LOGOUT_SAGA, logoutSaga);

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