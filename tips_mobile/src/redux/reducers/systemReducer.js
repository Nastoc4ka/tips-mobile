import {
  SHOW_BLUR,
  HIDE_BLUR,
  SHOW_LOADING,
  HIDE_LOADING,
  CURRENT_PASSWORD_CONFIRMED,
  CURRENT_PASSWORD_SET_FALSE,
  CLEAR_MESSAGE,
  SET_MESSAGE,
  SEND_DATA_DISABLE,
  SEND_DATA_ACTIVE,
  PIN_CHANGE_DISABLE,
  PIN_CHANGE_ACTIVE,
} from '../actions/types';

const initialState = {
  blur: false,
  loading: false,
  message: '',
  sendData: false,
  confirmPassword: false,
  sms: null,
  pinChanged: false,
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_DATA_ACTIVE:
      return {
        ...state,
        sendData: true,
      };
    case SEND_DATA_DISABLE:
      return {
        ...state,
        sendData: false,
      };
    case SHOW_BLUR:
      return {
        ...state,
        blur: true,
      };
    case HIDE_BLUR:
      return {
        ...state,
        blur: false,
      };
    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        blur: true,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        blur: false,
      };
    case CURRENT_PASSWORD_CONFIRMED:
      return {
        ...state,
        confirmPassword: true,
      };
    case CURRENT_PASSWORD_SET_FALSE:
      return {
        ...state,
        confirmPassword: false,
      };
    case PIN_CHANGE_ACTIVE:
      return {
        ...state,
        pinChanged: true,
      };
    case PIN_CHANGE_DISABLE:
      return {
        ...state,
        pinChanged: false,
      };
    default:
      return state;
  }
};

export default systemReducer;
