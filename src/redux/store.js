import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import reviewsReducer from "./reducers/reviewsReducer";

const reducer = combineReducers({
  auth: authReducer,
  reviews: reviewsReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
