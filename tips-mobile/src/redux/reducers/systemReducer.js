import {
    SHOW_BLUR,
    HIDE_BLUR,
    SHOW_LOADING,
    HIDE_LOADING, CLEAR_MESSAGE, SET_MESSAGE, SET_AUTHENTICATION
} from "../actions/types";

const initialState = {
    blur: false,
    loading: false,
    authenticated: false,
    message: '',
};

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_BLUR:
            return { 
                ...state,
                blur: true 
            };
        case HIDE_BLUR:
            return { 
                ...state,
                blur: false 
            };
        case SHOW_LOADING:
            return { 
                ...state,
                loading: true,
            };
        case HIDE_LOADING:
            return { 
                ...state,
                loading: false
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
                blur: true
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: '',
                blur: false
            };
        case SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: true
            }
        default:
            return state;
    }
};

export default systemReducer;