import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case actionTypes.LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        userId: action.userId,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
