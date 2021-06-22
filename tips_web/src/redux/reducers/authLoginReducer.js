import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

let user = null;

(() => {
  const data = localStorage.getItem("user");
  user = JSON.parse(data) || null;
})();

const initialState = {
  user,
};

const authLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;

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
