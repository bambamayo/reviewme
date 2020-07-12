import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./sass/main.scss";
import App from "./App";
import store from "./redux/store";

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
  faTrashAlt,
  faTimes
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
