import React from "react";

const Loader = (props) => (
  <span className={`loader ${props.loaderClass}`} data-testid="loader"></span>
);

export default Loader;
