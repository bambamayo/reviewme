import React from "react";
import PropTypes from "prop-types";

const Avatar = (props) => {
  return (
    <img
      src={props.image}
      alt={props.alttext}
      className={`cld-responsive ${props.avatarClass}`}
      data-src={props.dataSrc}
    />
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  alttext: PropTypes.string.isRequired,
  avatarClass: PropTypes.string,
  dataSrc: PropTypes.string.isRequired,
};

export default Avatar;
