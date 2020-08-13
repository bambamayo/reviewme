import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userId: null,
  error: null,
  loading: false,
  token: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case actionTypes.LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        userId: action.userId,
        token: action.token,
        user: action.user,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case actionTypes.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        token: null,
        user: null,
      };

    case actionTypes.RELOAD_START:
      return state;

    case actionTypes.RELOAD_USER:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        user: action.user,
      };
    case actionTypes.RELOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        userId: null,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
