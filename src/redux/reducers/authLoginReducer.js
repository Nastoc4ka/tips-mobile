import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT,} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

let user = null;

(async () => {
    return await AsyncStorage.getItem('userToken')
        .then((data) => {
            data != null ? user.userToken = data : null
        });
})();

// console.log(user());
//
// (async () => {
//     await AsyncStorage.removeItem('user');
// })();
// console.log(user());


const initialState = {
    user,
    isLoggedIn: user ? true : false,
    loading: false,
    blur: false
}

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