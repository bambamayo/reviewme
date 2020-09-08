import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import reviewsReducer from "./reducers/reviewsReducer";
import modalReducer from "./reducers/modalReducer";
import dashboardReducer from "./reducers/dashboardReducer";

const reducer = combineReducers({
  auth: authReducer,
  review: reviewsReducer,
  showModal: modalReducer,
  dashboard: dashboardReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
