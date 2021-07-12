import {
  GET_ORGANIZATIONS_FAIL,
  GET_ORGANIZATIONS_SUCCESS,
  REGISTER_INIT,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  organizations: [],
  errorOrganizations: null,
  registeredSuccessful: false,
};

const authRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload,
        errorOrganizations: null,
      };
    case GET_ORGANIZATIONS_FAIL:
      return {
        ...state,
        organizations: [],
        errorOrganizations: action.payload,
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
