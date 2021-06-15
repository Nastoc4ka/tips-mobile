import {combineReducers} from 'redux';
import authLoginReducer from './authLoginReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
    authLoginReducer,
    userReducer,
});