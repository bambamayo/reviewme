import * as actionTypes from "./actionTypes";

export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL,
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL,
  };
};
