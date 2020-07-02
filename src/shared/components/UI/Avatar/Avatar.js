import React from "react";
import PropTypes from "prop-types";

const Avatar = (props) => {
  return (
    <img src={props.image} alt={props.alttext} className={props.avatarClass} />
  );
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  alttext: PropTypes.string.isRequired,
  avatarClass: PropTypes.string,
};

export default Avatar;
