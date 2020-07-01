import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.className} {...props}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
};

export default Button;
