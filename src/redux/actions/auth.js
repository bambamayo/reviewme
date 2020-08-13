import userService from "../../services/user";
import * as actionTypes from "./actionTypes";
import { batch } from "react-redux";
import history from "../../history";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const reloadStart = () => {
  return {
    type: actionTypes.RELOAD_START,
  };
};

export const reloadUser = (userId, token, user) => {
  return {
    type: actionTypes.RELOAD_USER,
    userId,
    token,
    user,
  };
};

export const reloadUserFailed = () => {
  return {
    type: actionTypes.RELOAD_USER_FAIL,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const userLoggedIn = (userId, token, user) => {
  return {
    type: actionTypes.LOGGED_IN,
    userId,
    token,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await userService.loginUser(data);
      dispatch(userLoggedIn(response.user.id, response.token, response.user));
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
      history.push(`/${response.user.username}/profile`);
    } catch (error) {
      batch(() => {
        dispatch(authFail(error.response.data.message));
      });
    }
  };
};

export const signupUser = (data) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await userService.signupUser(data);
      dispatch(userLoggedIn(response.user.id, response.token, response.user));
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
      history.push(`/${response.user.username}/profile`);
    } catch (error) {
      dispatch(authFail(error.response.data.message));
    }
  };
};

export const getReloadedUser = () => {
  return async (dispatch) => {
    dispatch(reloadStart());

    try {
      const response = await userService.getLoggedInUser();
      dispatch(
        reloadUser(
          response.user.id,
          localStorage.getItem("token"),
          response.user
        )
      );
    } catch (error) {
      localStorage.clear();
      dispatch(reloadUserFailed());
    }
  };
};

export const logoutUser = () => {
  localStorage.clear();
  return {
    type: actionTypes.LOG_OUT,
  };
};
