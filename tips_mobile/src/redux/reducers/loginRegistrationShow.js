import {LOGIN_SCREEN_SHOW, REGISTRATION_SCREEN_SHOW} from "../actions/types";

const initialState = {
    loginOrRegistrationShow: true,
};

const loginRegistrationShow = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SCREEN_SHOW:
            return {
                loginOrRegistrationShow: true,
            };
        case REGISTRATION_SCREEN_SHOW:
            return {
                loginOrRegistrationShow: false,
            };
        default:
            return state;
    }
};

export default loginRegistrationShow