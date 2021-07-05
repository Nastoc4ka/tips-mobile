import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT,} from "../actions/types";

const initialState = {
    user: null
};

const authLoginReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                user: payload,
            };
        case LOGIN_FAIL:
            return {
                user: null,
            };
        case LOGOUT:
            return {
                user: null,
            };
        default:
            return state;
    }
};

export default authLoginReducer;