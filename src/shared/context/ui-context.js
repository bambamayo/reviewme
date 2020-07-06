import { createContext } from "react";

export const UIContext = createContext({
  show: false,
  msg: "",
  error: false,
  handleErrorAvail: () => {},
  handleErrorNotAvail: () => {},
  handleShow: () => {},
  handleClose: () => {},
});
