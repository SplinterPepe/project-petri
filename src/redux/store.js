/* eslint-disable no-underscore-dangle */
import { createStore } from "redux";
import { rootReducer } from "./reducers";

const store = createStore(
  rootReducer,
  require("../App/DevTools").default.instrument()
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
