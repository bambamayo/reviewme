import React from "react";

import "./Avatar.css";

const Avatar = (props) => {
  return (
    <img src={props.image} alt={props.alttext} className={props.avatarClass} />
  );
};

export default Avatar;
