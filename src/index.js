import React from "react";
import ReactDOM from "react-dom";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBeer,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./sass/main.scss";
import App from "./App";

library.add(faHeart, faBeer, faSortDown, faSortUp);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
