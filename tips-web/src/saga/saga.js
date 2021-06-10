import {call, put, takeEvery} from 'redux-saga/effects';
import {
    loginSuccess,
} from '../redux/actions';
import {authService} from '../services';


import {
    LOGIN_SAGA,
} from "../redux/actions/types";

export function* sagaWatcher() {
    yield takeEvery(LOGIN_SAGA, loginSaga);
}

function* loginSaga(action) {
    try {
        const payload = yield call(() => authService.login(action.payload));
        yield put(loginSuccess(payload))
    } catch (error) {
        console.log(error)
    }
}