import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT,} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const user = AsyncStorage.getItem("user");

const initialState = user
    ? {isLoggedIn: true, user}
    : {isLoggedIn: false, user: null};

const authLoginReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: payload,
                loading: false
            };
        case LOGIN_FAIL:
            return {
                isLoggedIn: false,
                user: null,
                loading: false
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: null,
                loading: false
            };
        default:
            return state;
    }
};

export default authLoginReducer;