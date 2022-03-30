import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ownerReducer from "./ownerReducer";
import vehicleReducer from "./vehicleReducer";

const reducers = {
  owner: ownerReducer,
  vehicle: vehicleReducer,
};

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default createRootReducer;
