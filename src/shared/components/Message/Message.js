import React from "react";

import Icon from "../UI/Icon/Icon";

const Message = (props) => {
  return (
    <div className="message__box" style={{ backgroundColor: props.bgColor }}>
      <p className="message__text">{props.msg}</p>
      <button className="message__icon" onClick={props.iconClicked}>
        <Icon type={["far", "times-circle"]} />
      </button>
    </div>
  );
};

export default Message;
