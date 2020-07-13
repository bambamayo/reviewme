import * as actionTypes from "../actions/actionTypes";

const initialState = {
  editing: false,
  loading: false,
  message: "",
  error: null,
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
      };

    case actionTypes.PROFILE_EDITED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.PROFILE_EDITING_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
        error: action.error,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
