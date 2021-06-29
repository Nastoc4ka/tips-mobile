import {
    PIN_AUTHENTICATION_SUCCESS,
    REMOVE_PIN_AUTHENTICATION,
    SET_PIN_AUTHENTICATION,
    PIN_AUTHENTICATIED_FALSE
} from "../actions/types";

const initialState = {
    success: false,
    pin: null,
};

const pinAuthenticateReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PIN_AUTHENTICATION:
            return {
                success: true,
                pin: action.payload,
            };
        case REMOVE_PIN_AUTHENTICATION:
            return {
                success: true,
                pin: null,
            };
        case PIN_AUTHENTICATIED_FALSE:
            return {
                ...state,
                success: false,
            };
        case PIN_AUTHENTICATION_SUCCESS:
            return {
                ...state,
                success: true,
            };
        default:
            return state;
    }
};

export default pinAuthenticateReducer;