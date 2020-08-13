import * as actionTypes from "../actions/actionTypes";

const intitialState = {
  reviews: [],
  message: "",
  error: null,
  loading: false,
  reviewInViewId: null,
};

const reviewsReducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionTypes.START_REVIEWS_ACTION:
      return {
        ...state,
        loading: true,
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

    case actionTypes.SET_REVIEW_IN_VIEW:
      return {
        ...state,
        reviewInViewId: action.id,
      };

    default:
      return state;
  }
};

export default reviewsReducer;
