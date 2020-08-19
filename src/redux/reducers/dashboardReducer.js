import * as actionTypes from "../actions/actionTypes";

const initialState = {
  editing: false,
  loading: false,
  message: "",
  error: false,
  showEditDialog: false,
  showDeleteDialog: false,
  currentReviewId: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.message,
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

    case actionTypes.PROFILE_EDITING_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
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
