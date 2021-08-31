import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import postAd from "./postAd";

export default combineReducers({
  auth,
  message,
  postAd,
});
