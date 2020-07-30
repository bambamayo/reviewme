import * as actionTypes from "./actionTypes";
import { batch } from "react-redux";

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

export const editFailed = (message) => {
  return {
    type: actionTypes.PROFILE_EDITING_FAIL,
    message,
  };
};

export const editDialogShow = (id) => {
  return {
    type: actionTypes.SHOW_EDIT_DIALOG,
    id,
  };
};

export const editDialogHide = () => {
  return {
    type: actionTypes.HIDE_EDIT_DIALOG,
  };
};

export const deleteDialogShow = (id) => {
  return {
    type: actionTypes.SHOW_DELETE_DIALOG,
    id,
  };
};

export const deleteDialogHide = () => {
  return {
    type: actionTypes.HIDE_DELETE_DIALOG,
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
