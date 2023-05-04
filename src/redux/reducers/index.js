import { combineReducers } from "redux";

import RegisterReducer from "./RegisterReducer";
import LoginReducer from "./LoginReducer";

const rootReducer = combineReducers({
  RegisterReducer,
  LoginReducer,
});

export default rootReducer;
