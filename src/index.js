import React from "react";
import ReactDOM from "react-dom";

import {
  faHeart,
  faListAlt,
  faEdit,
  faTimesCircle,
  faUser,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBeer,
  faSortDown,
  faSortUp,
  faUserAlt,
  faHeart as heart,
  faBookOpen,
  faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./sass/main.scss";
import App from "./App";

library.add(
  faHeart,
  faBeer,
  faSortDown,
  faSortUp,
  faUserAlt,
  heart,
  faBookOpen,
  faListAlt,
  faEdit,
  faTimesCircle,
  faUser,
  faCameraRetro,
  faTrashAlt
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
