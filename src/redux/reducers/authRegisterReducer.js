import {
    GET_ORGANISATIONS_FAIL,
    GET_ORGANISATIONS_LOADING,
    GET_ORGANISATIONS_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING,
    REGISTER_SUCCESS
} from "../actions/types";

const initialState = {
    organisations: [],
    loadingOrganisations: true,
    errorOrganisations: null,

    registeredSuccessful: false,
    loading: true,
    error: null,
};

const authRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORGANISATIONS_LOADING:
            return {
                ...state,
                organisations: [],
                loadingOrganisations: true,
            };
        case GET_ORGANISATIONS_SUCCESS:
            return {
                ...state,
                organisations: action.payload,
                loadingOrganisations: false,
                errorOrganisations: null,
            };
        case GET_ORGANISATIONS_FAIL:
            return {
                ...state,
                organisations: [],
                loadingOrganisations: false,
                errorOrganisations: action.payload,
            };
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                registeredSuccessful: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                registeredSuccessful: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registeredSuccessful: true,
                error: null,
            };
        default:
            return state;
    }
};

export default authRegisterReducer;