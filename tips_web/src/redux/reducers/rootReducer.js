import { combineReducers } from "redux";
import authLoginReducer from "./authLoginReducer";
import adminReducer from "./adminReducer";
import systemReducer from "./systemReducer";

export const rootReducer = combineReducers({
  authLoginReducer,
  adminReducer,
  systemReducer,
});
