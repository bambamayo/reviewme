import * as actionTypes from "../actions/actionTypes";

const initialState = {
  editing: false,
  loading: false,
  error: false,
  message: "",
  showEditDialog: false,
  showDeleteDialog: false,
  currentReviewId: null,
  userReviews: null,
  getUserReviewsError: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MSG:
      return {
        ...state,
        message: action.msg,
      };

    case actionTypes.START_EDITING:
      return {
        ...state,
        editing: true,
      };

    case actionTypes.STOP_EDITING:
      return {
        ...state,
        editing: false,
      };

    case actionTypes.PROFILE_EDITING:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actionTypes.PROFILE_EDITED:
      return {
        ...state,
        loading: false,
        user: action.user,
      };

    case actionTypes.PROFILE_DELETED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PROFILE_EDITING_FAIL:
      return {
        ...state,
        loading: false,
        message: action.msg,
        error: true,
      };

    case actionTypes.GET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.reviews,
      };

    case actionTypes.GET_USER_REVIEWS_FAIL:
      return {
        ...state,
        userReviewsError: action.error,
      };

    case actionTypes.MOD_USER_REVIEW_EDIT:
      return {
        ...state,
        userReviews: state.userReviews.map((review) =>
          review.id !== action.id ? review : action.review
        ),
      };

    case actionTypes.MOD_USER_REVIEW_DELETE:
      return {
        ...state,
        userReviews: state.userReviews.filter(
          (review) => review.id !== action.id
        ),
      };

    case actionTypes.SHOW_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: true,
        currentReviewId: action.id,
      };

    case actionTypes.HIDE_EDIT_DIALOG:
      return {
        ...state,
        showEditDialog: false,
        currentReviewId: null,
      };

    case actionTypes.SHOW_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: true,
        currentReviewId: action.id,
      };

    case actionTypes.HIDE_DELETE_DIALOG:
      return {
        ...state,
        showDeleteDialog: false,
        currentReviewId: null,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
