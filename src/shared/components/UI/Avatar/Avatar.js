import React from "react";

const Avatar = (props) => {
  return (
    <img src={props.image} alt={props.alttext} className={props.avatarClass} />
  );
};

export default Avatar;
