import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  item_reducer: itemReducer,
  // auth:authReducer
});
