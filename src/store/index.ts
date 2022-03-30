import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const reducer = createRootReducer(history); // root reducer with router state
const middlewares = [];

middlewares.push(thunk);
middlewares.push(routerMiddleware(history)); // for dispatching history actions
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
