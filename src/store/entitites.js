import { combineReducers } from "redux";
import portfolios from "./portfolios";
import clients from "./clients";

export default combineReducers({
  clients: clients,
  portfolios: portfolios,
});
