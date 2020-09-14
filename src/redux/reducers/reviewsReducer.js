import * as actionTypes from "../actions/actionTypes";

const intitialState = {
  reviews: null,
  message: "",
  error: null,
  loading: false,
  review: null,
};

const reviewsReducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionTypes.START_REVIEWS_ACTION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.reviews,
      };

    case actionTypes.GET_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.review,
      };

    case actionTypes.GET_REVIEW_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.concat(action.review),
      };

    case actionTypes.ADD_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.REMOVE_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
