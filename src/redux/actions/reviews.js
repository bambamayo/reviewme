import reviewService from "../../services/review";
import * as actionTypes from "./actionTypes";
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

export const fetchReviewByIdSuccess = (review) => {
  return {
    type: actionTypes.GET_REVIEW_BY_ID_SUCCESS,
    review,
  };
};

export const fetchReviewByIdFail = (error) => {
  return {
    type: actionTypes.GET_REVIEW_BY_ID_FAIL,
    error,
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

export const removeError = () => {
  return {
    type: actionTypes.REMOVE_ERROR,
  };
};

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const response = await reviewService.getAllReviews();
      dispatch(getReviewsSuccess(response.reviews));
    } catch (error) {
      dispatch(getReviewsFail(error.response.data.message));
    }
  };
};

export const getReviewById = (id) => {
  return async (dispatch) => {
    dispatch(startReviewsAction());
    try {
      const response = await reviewService.getReviewById(id);
      dispatch(fetchReviewByIdSuccess(response.review));
    } catch (error) {
      dispatch(fetchReviewByIdFail(error.response.data.message));
    }
  };
};

export const addNewReview = (data) => {
  return async (dispatch) => {
    dispatch(startReviewsAction());
    try {
      const response = await reviewService.createNewReview(data);
      dispatch(addReviewSuccess(response.createdReview));

      history.push(
        `/reviews/${response.createdReview.reviewedName}/${response.createdReview.id}`.replace(
          / /g,
          "-"
        )
      );
    } catch (error) {
      dispatch(addReviewFail(error.response.data.message));
      window.scrollTo(0, 0);
    }
  };
};
