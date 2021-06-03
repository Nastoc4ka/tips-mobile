import {REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const user = AsyncStorage.getItem("user");

const initialState = {
    registeredSuccessful: false,
    loading: false,
};

const authRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                registeredSuccessful: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                registeredSuccessful: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registeredSuccessful: true,
            };
        default:
            return state;
    }
};

export default authRegisterReducer;