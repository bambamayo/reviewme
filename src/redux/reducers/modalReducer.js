import * as actionTypes from "../actions/actionTypes";

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return true;
    case actionTypes.HIDE_MODAL:
      return false;
    default:
      return state;
  }
};

export default modalReducer;
