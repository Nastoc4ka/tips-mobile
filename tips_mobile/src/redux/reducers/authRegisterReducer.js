import {
    GET_ORGANISATIONS_FAIL,
    GET_ORGANISATIONS_SUCCESS,
    REGISTER_INIT,
    REGISTER_SUCCESS
} from "../actions/types";

const initialState = {
    organisations: [],
    errorOrganisations: null,
    registeredSuccessful: false,
};

const authRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORGANISATIONS_SUCCESS:
            return {
                ...state,
                organisations: action.payload,
                errorOrganisations: null,
            };
        case GET_ORGANISATIONS_FAIL:
            return {
                ...state,
                organisations: [],
                errorOrganisations: action.payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registeredSuccessful: true,
            };

            case REGISTER_INIT:
            return initialState;
        default:
            return state;
    }
};

export default authRegisterReducer;