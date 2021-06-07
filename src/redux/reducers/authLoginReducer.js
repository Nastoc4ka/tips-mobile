import {LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT,} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';

let user = null;

(async () => {
    return await AsyncStorage.getItem('user')
        .then((data) => {
            data != null ? user = JSON.parse(data) : null
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
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: payload,
            };
        case LOGIN_FAIL:
            return {
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authLoginReducer;