import { call, put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  hideBlur,
  hideLoading,
  loginSuccess,
  logout,
  registerSuccess,
  setMessage,
  showBlur,
  showLoading,
  getOrganizationsFail,
  getOrganizationsSuccess,
  setPinAuthentication,
  pinAuthenticatiedFalse,
  currentPasswordConfirmed,
  pinChangeActive,
  fetchedNews,
  updatedNews,
  createdNewsItem,
  removedNewsItem,
} from '../redux/actions';

import {
  authService,
  organizationsService,
  updateUserDataService,
  updatePassword,
  updateBirthdateAccess,
  createNews,
  getNews,
  removeNews,
  updateNews,
} from '../services';

import {
  LOGIN_SAGA,
  LOGOUT_SAGA,
  REGISTER_SAGA,
  GET_ORGANIZATIONS_SAGA,
  UPDATE_USER_SAGA,
  GET_LOCAL_DATA_SAGA,
  SET_PIN_AUTHENTICATION_SAGA,
  SET_CONFIRM_CURRENT_PASSWORD_SAGA,
  UPDATE_PASSWORD_SAGA,
  CHANGE_BIRTHDATE_ACCESS_SAGA,
  NEWS_REQUESTED_SAGA,
  NEWS_ITEM_UPDATE_SAGA,
  NEWS_ITEM_CREATE_SAGA,
  NEWS_ITEM_REMOVE_SAGA,
} from '../redux/actions/types';

export function* sagaWatcher() {
  yield takeEvery(LOGIN_SAGA, loginSaga);
  yield takeEvery(UPDATE_PASSWORD_SAGA, updatePasswordSaga);
  yield takeEvery(CHANGE_BIRTHDATE_ACCESS_SAGA, changeBirthdateAccessSaga);
  yield takeEvery(SET_CONFIRM_CURRENT_PASSWORD_SAGA, setConfirmCurrentPasswordSaga);
  yield takeEvery(SET_PIN_AUTHENTICATION_SAGA, setPinAuthenticationSaga);
  yield takeEvery(GET_LOCAL_DATA_SAGA, getLocalDataSaga);
  yield takeEvery(GET_ORGANIZATIONS_SAGA, fetchOrganizationsSaga);
  yield takeEvery(REGISTER_SAGA, registerSaga);
  yield takeEvery(UPDATE_USER_SAGA, updateUserSaga);
  yield takeEvery(LOGOUT_SAGA, logoutSaga);
  yield takeEvery(NEWS_ITEM_REMOVE_SAGA, removeNewsItemSaga);
  yield takeEvery(NEWS_ITEM_CREATE_SAGA, createNewsItemSaga);
  yield takeEvery(NEWS_ITEM_UPDATE_SAGA, updateNewsItemSaga);
  yield takeEvery(NEWS_REQUESTED_SAGA, fetchNewsSaga);
}

function* fetchNewsSaga() {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const payload = yield call(getNews);
    yield put(fetchedNews(payload));
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* removeNewsItemSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    yield call(() => removeNews(action.payload));
    yield put(removedNewsItem(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* createNewsItemSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    yield call(() => createNews(action.payload));
    yield put(createdNewsItem(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* updateNewsItemSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    yield call(() => updateNews(action.payload));
    yield put(updatedNews(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* changeBirthdateAccessSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const updatedUser = yield call(() => updateBirthdateAccess(action.payload));
    yield put(loginSuccess(updatedUser.userData));
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* updatePasswordSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const updatedUser = yield call(() => updatePassword(action.payload));
    yield put(loginSuccess(updatedUser.userData));
    yield put(hideLoading());
    yield put(setMessage(updatedUser.msg));
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* setConfirmCurrentPasswordSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    yield call(() => authService.confirmCurrentPassword(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(currentPasswordConfirmed());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* setPinAuthenticationSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    yield call(() => AsyncStorage.setItem('pin', action.payload));
    yield put(setPinAuthentication(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(pinChangeActive());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

const getUserFromLocalStorage = async () => {
  const user = await AsyncStorage.getItem('user');
  return user ? await JSON.parse(user) : null;
};

function* getLocalDataSaga() {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const userData = yield call(getUserFromLocalStorage);
    const pin = yield call(() => AsyncStorage.getItem('pin'));
    if (userData) {
      yield put(loginSuccess(userData));
    }
    if (pin) {
      yield put(setPinAuthentication(pin));
    }
    yield put(hideLoading());
    yield put(hideBlur());
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* updateUserSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const updatedUser = yield call(() => updateUserDataService(action.payload));
    yield put(loginSuccess(updatedUser.userData));
    yield put(hideLoading());
    yield put(setMessage(updatedUser.msg));
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function* fetchOrganizationsSaga() {
  try {
    const payload = yield call(() => organizationsService.getOrganizations());
    yield put(getOrganizationsSuccess(payload));
  } catch (error) {
    yield put(getOrganizationsFail(error));
  }
}

function* loginSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const payload = yield call(() => authService.login(action.payload));
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(loginSuccess(payload));
  } catch (error) {
    yield put(hideLoading());
    yield put(setMessage(error.msg));
  }
}

function* logoutSaga() {
  try {
    yield call(() => authService.logout());
    yield put(logout());
    yield put(pinAuthenticatiedFalse());
  } catch (error) {
    yield put(setMessage(error.msg));
  }
}

function* registerSaga(action) {
  try {
    yield put(showBlur());
    yield put(showLoading());
    const isRegistered = yield call(() => authService.register(action.payload));
    yield put(registerSuccess());
    yield put(hideLoading());
    yield put(setMessage(isRegistered.msg));
  } catch (error) {
    yield put(hideLoading());
    yield put(hideBlur());
    yield put(setMessage(error.msg));
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}
