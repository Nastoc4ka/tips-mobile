import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  CAMERA_OFF,
  CAMERA_ON,
} from "../actions/types";

const initialState = {
  camera: false,
  isUserAdded: false,
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAMERA_OFF:
      return {
        ...state,
        camera: false,
      };
    case CAMERA_ON:
      return {
        ...state,
        camera: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isUserAdded: true,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        isUserAdded: false,
      };
    default:
      return state;
  }
};

export default systemReducer;
