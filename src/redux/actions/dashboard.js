import * as actionTypes from "./actionTypes";

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

export const editSuccess = (user) => {
  return {
    type: actionTypes.PROFILE_EDITED,
    user,
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
