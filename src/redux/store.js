import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import reviewsReducer from "./reducers/reviewsReducer";
import modalReducer from "./reducers/modalReducer";

const reducer = combineReducers({
  auth: authReducer,
  reviews: reviewsReducer,
  showModal: modalReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
