import {combineReducers} from 'redux';
import messageReducer from "./messageReducer";
import authRegisterReducer from "./authRegisterReducer";
import authLoginReducer from "./authLoginReducer";

export const rootReducer = combineReducers({
    messageReducer,
    authLoginReducer,
    authRegisterReducer,
});