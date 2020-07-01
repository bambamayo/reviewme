import React from "react";
import PropTypes from "prop-types";

import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";

const Message = (props) => {
  return (
    <div className="message__box" style={{ backgroundColor: props.bgColor }}>
      <p className="message__text">{props.msg}</p>
      <Button className="message__icon" onClick={props.iconClicked}>
        <Icon type={["far", "times-circle"]} />
      </Button>
    </div>
  );
};

Message.propTypes = {
  bgColor: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  iconClicked: PropTypes.func.isRequired,
};

export default Message;
