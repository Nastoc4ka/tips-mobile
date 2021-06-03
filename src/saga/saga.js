import React from 'react'
import {call, put, takeEvery} from 'redux-saga/effects';
import {
    hideBlur,
    hideLoading,
    loginFail,
    loginLoading,
    loginSuccess,
    logout,
    registerFail,
    registerSuccess,
    setMessage,
    showBlur,
    showLoading,
} from '../redux/actions';
import {authService} from '../services';

import {
    LOGIN_SAGA,
    LOGOUT_SAGA,
    REGISTER_SAGA
} from "../redux/actions/types";
import AuthModal from '../components/modals/AuthModal';

export function* sagaWatcher() {
    yield takeEvery(LOGIN_SAGA, loginSaga);
    yield takeEvery(REGISTER_SAGA, registerSaga);
    yield takeEvery(LOGOUT_SAGA, logoutSaga);

}

function* loginSaga(action) {
    try {
        yield put(showBlur());
        yield put(showLoading());
        const payload = yield call(() => authService.login(action.payload));
        yield put(hideLoading())
        yield put(hideBlur())
        yield put(loginSuccess(payload))
    } catch (error) {
        yield put(hideLoading())
        yield put(loginFail());
        yield put(setMessage(error.msg));
    }
}

function* logoutSaga() {
    try {
        yield put(loginLoading());
        yield call(() => authService.logout());
        yield put(logout())
    } catch (error) {
        //yield put(logoutFail());
        yield put(setMessage(error.msg));
    }
}

function* registerSaga(action) {
    try {
        yield put(showBlur());
        yield put(showLoading());
        const payload = yield call(() => authService.register(action.payload));
        yield put(registerSuccess(payload));
        yield put(hideLoading());
    } catch (error) {
        yield put(registerFail());
        yield put(hideLoading());
        yield put(hideBlur());
        yield put(setMessage(error.msg));
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
}