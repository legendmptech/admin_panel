import { combineReducers } from "redux";
import ui from "./ui";
import auth from "./auth";
import entitites from "./entitites";

export default combineReducers({
  ui: ui,
  auth: auth,
  entitites: entitites,
});
