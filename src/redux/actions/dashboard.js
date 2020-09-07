import * as actionTypes from "./actionTypes";
import userService from "../../services/user";
import { batch } from "react-redux";
import { getReloadedUser, logoutUser } from "./auth";

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

export const profileDeleted = () => {
  return {
    type: actionTypes.PROFILE_DELETED,
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

export const updateProfilePicture = (data) => {
  const userId = localStorage.getItem("userId");
  return async (dispatch) => {
    dispatch(editStart());
    const imgData = new FormData();
    imgData.append("image", data);

    try {
      const response = await userService.editUserProfilePicture(
        userId,
        imgData
      );
      batch(() => {
        dispatch(stopEditing());
        dispatch(editSuccess(response.user));
        dispatch(setMessage(response.message));
        dispatch(getReloadedUser());
      });
    } catch (error) {
      dispatch(editFailed(error.response.data.message));
    }
  };
};

export const deleteProfilePicture = () => {
  const userId = localStorage.getItem("userId");
  return async (dispatch) => {
    dispatch(editStart());
    try {
      const response = await userService.removeProfilePicture(userId);
      batch(() => {
        dispatch(stopEditing());
        dispatch(editSuccess(response.user));
        dispatch(setMessage(response.message));
        dispatch(getReloadedUser());
      });
    } catch (error) {
      dispatch(editFailed(error.response.data.message));
    }
  };
};

export const deleteUserAccount = () => {
  const userId = localStorage.getItem("userId");
  return async (dispatch) => {
    console.log("entered here too");
    dispatch(editStart());
    try {
      const response = await userService.deleteAccount(userId);
      console.log(response);
      batch(() => {
        dispatch(stopEditing());
        dispatch(profileDeleted());
        dispatch(logoutUser());
      });
    } catch (error) {
      dispatch(editFailed(error.response.data.message));
    }
  };
};
