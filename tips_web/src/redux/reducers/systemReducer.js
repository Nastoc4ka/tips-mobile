import { CAMERA_OFF, CAMERA_ON } from "../actions/types";

const initialState = {
  camera: false,
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
    default:
      return state;
  }
};

export default systemReducer;
