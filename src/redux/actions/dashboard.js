import * as actionTypes from "./actionTypes";
import { batch } from "react-redux";
// import { showModal } from "./modal";

export const startEditing = () => {
  return {
    type: actionTypes.START_EDITING,
  };
};

export const stopEditing = () => {
  return {
    type: actionTypes.STOP_EDITING,
  };
};

export const editStart = () => {
  return {
    type: actionTypes.PROFILE_EDITING,
  };
};

export const editSuccess = () => {
  return {
    type: actionTypes.PROFILE_EDITED,
  };
};

export const setMessage = (message) => {
  return {
    type: actionTypes.SET_MESSAGE,
    message,
  };
};

export const editProfile = () => {
  return async (dispatch) => {
    dispatch(editStart());
    setTimeout(() => {
      batch(() => {
        dispatch(editSuccess());
        dispatch(setMessage("Profile edited successfully"));
        dispatch(stopEditing());
      });
    }, 2000);
  };
};
