import {
  GET_ORGANIZATIONS_SUCCESS,
  GET_STAFF_SUCCESS,
  // LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  organizations: [],
  staff: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload,
      };
    case GET_STAFF_SUCCESS:
      return {
        ...state,
        staff: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
