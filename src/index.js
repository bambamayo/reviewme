import React from "react";
import ReactDOM from "react-dom";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./index.css";
import App from "./App";

library.add(faHeart);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
