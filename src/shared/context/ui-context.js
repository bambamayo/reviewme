import { createContext } from "react";

export const UIContext = createContext({
  show: false,
  msg: "",
  handleShow: () => {},
  handleClose: () => {},
});
