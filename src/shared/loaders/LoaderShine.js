import React from "react";
import PropTypes from "prop-types";

const LoaderShine = (props) => {
  return <div className={props.loaderClass}></div>;
};

LoaderShine.propTypes = {
  loaderClass: PropTypes.string.isRequired,
};

export default LoaderShine;
