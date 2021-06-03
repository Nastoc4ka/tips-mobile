import {CLEAR_MESSAGE, SET_MESSAGE} from "../actions/types";

const initialState = {
    message: '',
    blur: true
};

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_MESSAGE:
            return {
                message: payload,
                blur: true
            };
        case CLEAR_MESSAGE:
            return {
                message: '',
                blur: false
            };
        default:
            return state;
    }
};

export default messageReducer