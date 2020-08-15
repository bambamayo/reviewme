import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import {
  faHeart,
  faListAlt,
  faEdit,
  faTimesCircle,
  faUser,
  faUserCircle,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBeer,
  faSortDown,
  faSortUp,
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
  faUserCircle,
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

if (module.hot) {
  module.hot.accept();
}
