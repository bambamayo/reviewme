import reviewService from "../../services/review";
import * as actionTypes from "./actionTypes";
import { batch } from "react-redux";
import history from "../../history";

export const startReviewsAction = () => {
  return {
    type: actionTypes.START_REVIEWS_ACTION,
  };
};

export const getReviewsFail = (error) => {
  return {
    type: actionTypes.GET_REVIEWS_FAIL,
    error,
  };
};

export const getReviewsSuccess = (reviews) => {
  return {
    type: actionTypes.GET_REVIEWS_SUCCESS,
    reviews,
  };
};

export const addReviewSuccess = (review) => {
  return {
    type: actionTypes.ADD_REVIEW_SUCCESS,
    review,
  };
};

export const addReviewFail = (error) => {
  return {
    type: actionTypes.ADD_REVIEW_FAIL,
    error,
  };
};

export const setReviewInView = (id) => {
  return {
    type: actionTypes.SET_REVIEW_IN_VIEW,
    id,
  };
};

export const removeError = () => {
  return {
    type: actionTypes.REMOVE_ERROR,
  };
};

export const addNewReview = (data) => {
  return async (dispatch) => {
    dispatch(startReviewsAction());
    try {
      const response = await reviewService.createNewReview(data);
      batch(() => {
        dispatch(addReviewSuccess(response.createdReview));
        dispatch(setReviewInView(response.createdReview.id));
      });
      history.push(
        `reviews/${response.createdReview.reviewedName}`.replace(/ /g, "-")
      );
    } catch (error) {
      dispatch(addReviewFail(error.response.data.message));
    }
  };
};
