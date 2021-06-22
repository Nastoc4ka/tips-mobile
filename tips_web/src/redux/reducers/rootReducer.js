import { combineReducers } from "redux";
import authLoginReducer from "./authLoginReducer";
import organizationReducer from "./organizationReducer";

export const rootReducer = combineReducers({
  authLoginReducer,
  organizationReducer,
});
