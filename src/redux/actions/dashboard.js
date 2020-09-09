import * as actionTypes from "./actionTypes";
import userService from "../../services/user";
import { batch } from "react-redux";
import { getReloadedUser, logoutUser } from "./auth";
import reviewService from "../../services/review";

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

export const getUserReviews = (reviews) => {
  return {
    type: actionTypes.GET_USER_REVIEWS,
    reviews,
  };
};

export const getUserReviewsFail = (error) => {
  return {
    type: actionTypes.GET_USER_REVIEWS_FAIL,
    error,
  };
};

export const editUserReview = (id, review) => {
  return {
    type: actionTypes.MOD_USER_REVIEW_EDIT,
    id,
    review,
  };
};

export const deleteUserReview = (id) => {
  return {
    type: actionTypes.MOD_USER_REVIEW_DELETE,
    id,
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

export const setMsg = (msg) => {
  return {
    type: actionTypes.SET_MSG,
    msg,
  };
};

export const editFailed = (msg) => {
  return {
    type: actionTypes.PROFILE_EDITING_FAIL,
    msg,
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

export const fetchUserReviews = (id) => {
  return async (dispatch) => {
    try {
      const response = await reviewService.getReviewsByUser(id);
      dispatch(getUserReviews(response.userReviews));
    } catch (error) {
      dispatch(getUserReviewsFail(error.response.data.message));
    }
  };
};

export const handleEditUserReview = (id, formValues) => {
  return async (dispatch) => {
    dispatch(editStart());
    try {
      const response = await reviewService.editReview(id, formValues);

      batch(() => {
        dispatch(editSuccess());
        dispatch(editUserReview(id, response.review));
        dispatch(setMsg("Review edited successfully"));
        dispatch(editDialogHide());
      });
    } catch (error) {
      batch(() => {
        dispatch(editFailed("Could not edit review please try again"));
        dispatch(editDialogHide());
      });
    }
  };
};

export const handleDeleteUserReview = (id) => {
  return async (dispatch) => {
    dispatch(editStart());
    try {
      const response = await reviewService.deleteReview(id);
      if (response.status === 204) {
        batch(() => {
          dispatch(editSuccess());
          dispatch(deleteUserReview(id));
          dispatch(setMsg("Review deleted successfully"));
          dispatch(deleteDialogHide());
        });
      }
    } catch (error) {
      batch(() => {
        dispatch(editFailed("Could not delete review please try again"));
        dispatch(deleteDialogHide());
      });
    }
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
        dispatch(setMsg(response.message));
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
        dispatch(setMsg(response.message));
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
