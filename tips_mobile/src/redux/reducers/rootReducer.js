import { combineReducers } from 'redux';
import authRegisterReducer from './authRegisterReducer';
import authLoginReducer from './authLoginReducer';
import systemReducer from './systemReducer';
import loginRegistrationShow from './loginRegistrationShow';
import pinAuthenticateReducer from './pinAuthenticateReducer';
import newsReducer from './newsReducer';

export const rootReducer = combineReducers({
  authLoginReducer,
  authRegisterReducer,
  systemReducer,
  loginRegistrationShow,
  pinAuthenticateReducer,
  newsReducer,
});
