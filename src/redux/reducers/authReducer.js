import userService from "../../services/user";

const initialState = {
  isLoggedIn: false,
  userId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;

export const userLogin = (data) => {
  return async (dispatch) => {
    try {
      const returningUser = await userService.loginUser(data);
      dispatch({ type: "LOGGED_IN" });
    } catch (error) {}
    dispatch({
      type: "LOGIN_USER",
      data,
    });
  };
};
