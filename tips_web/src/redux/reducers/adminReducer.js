import {
  GET_ORGANIZATIONS_SUCCESS,
  GET_STAFF_SUCCESS,
  SET_CHOSEN_ORGANIZATION,
  // LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  organizations: [],
  chosenOrganization: null,
  staffVerified: [],
  staffNotVerified: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload,
      };
    case GET_STAFF_SUCCESS:
      return {
        ...state,
        staffVerified: action.payload.verified,
        staffNotVerified: action.payload.notVerified,
      };
    case SET_CHOSEN_ORGANIZATION:
      return {
        ...state,
        chosenOrganization: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
