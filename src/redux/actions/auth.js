import userService from "../../services/user";
import * as actionTypes from "./actionTypes";
import { showModal } from "./modal";
import { batch } from "react-redux";
import history from "../../history";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const userLoggedIn = (userId) => {
  return {
    type: actionTypes.LOGGED_IN,
    userId,
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
      const returningUser = await userService.loginUser(data);
      dispatch(userLoggedIn(returningUser.data.id));
      history.push("/bambam/profile");
    } catch (error) {
      batch(() => {
        dispatch(authFail(error.response.data.message));
        dispatch(showModal());
      });
    }
  };
};

export const signupUser = (data) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const newUser = await await userService.signupUser(data);
      dispatch(userLoggedIn(newUser.data.id));
      history.push("/bambam/profile");
    } catch (error) {
      batch(() => {
        dispatch(authFail(error.response.data.message));
        dispatch(showModal());
      });
    }
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
