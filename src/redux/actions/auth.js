import userService from "../../services/user";
import * as actionTypes from "./actionTypes";
import { showModal } from "./modal";

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
      console.log(returningUser);
      dispatch(userLoggedIn(returningUser.data.id));
    } catch (error) {
      dispatch(authFail(error.response.data.message));
      dispatch(showModal());
    }
  };
};
