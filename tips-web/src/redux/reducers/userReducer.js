import {
    GET_ORGANIZATIONS_SUCCESS,
    // LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
    organizations: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORGANIZATIONS_SUCCESS:
            return {
                ...state,
                organizations: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;