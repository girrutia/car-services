import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ownerReducer from "./ownerReducer";
import vehicleReducer from "./vehicleReducer";
import serviceReducer from "./serviceReducer";

const reducers = {
  owner: ownerReducer,
  vehicle: vehicleReducer,
  service: serviceReducer,
};

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default createRootReducer;
