import React from "react";
import PropTypes from "prop-types";

import Button from "../UI/Button/Button";

const Message = ({ msg, error, iconClicked }) => {
  return (
    <div
      className="message__box"
      style={{
        backgroundColor: error ? "#f8d7da" : "#d4edda",
        color: error ? "#721c24" : "#155724",
        borderColor: error ? "#f5c6cb" : "#c3e6cb",
      }}
    >
      {msg}
      <Button className="message__icon" onClick={iconClicked}>
        <span aria-hidden="true">&times;</span>
      </Button>
    </div>
  );
};

Message.propTypes = {
  error: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  iconClicked: PropTypes.func.isRequired,
};

export default Message;
