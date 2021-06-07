import {combineReducers} from 'redux';
import authRegisterReducer from './authRegisterReducer';
import authLoginReducer from './authLoginReducer';
import systemReducer from './systemReducer'
import loginRegistrationShow from './loginRegistrationShow'

export const rootReducer = combineReducers({
    authLoginReducer,
    authRegisterReducer,
    systemReducer,
    loginRegistrationShow,

});