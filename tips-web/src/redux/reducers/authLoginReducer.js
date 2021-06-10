import {LOGIN_FAIL, LOGIN_SUCCESS} from "../actions/types";

let user = null;

(async () => {
    const data = localStorage.getItem('user')
    return data !== null ? user = JSON.parse(data) : null
})();

// console.log(user());
//
// (async () => {
//     await AsyncStorage.removeItem('user');
// })();
// console.log(user());


const initialState = {
    user,
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
        default:
            return state;
    }
};

export default authLoginReducer;